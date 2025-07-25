const express = require("express");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const request = require("request");
const router = express.Router();

//@route   GET api/profile/me
//@desc    Get current users profile details
//@access  Private
//@algo    find user profile
//         check if profile exists
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "User",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

//@route   POST api/profile/
//@desc    Create or update user profile
//@access  Private
//@algo    validate status and skill value
//         Create profile object
//         if exists update else save new
//         return profile
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required.").not().isEmpty(),
      check("skills", "Skills is required.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        company,
        website,
        location,
        bio,
        status,
        githubUsername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedIn,
      } = req.body;

      //Build Profile object
      const profileFields = {};
      profileFields.user = req.user.id;
      if (company) profileFields.company = company;
      if (website) profileFields.website = website;
      if (location) profileFields.location = location;
      if (bio) profileFields.bio = bio;
      if (status) profileFields.status = status;
      if (githubUsername) profileFields.githubUsername = githubUsername;
      if (skills) {
        profileFields.skills = skills.split(",").map((skill) => skill.trim());
      }

      //Build social object
      profileFields.social = {};
      if (youtube) profileFields.social.youtube = youtube;
      if (twitter) profileFields.social.twitter = twitter;
      if (facebook) profileFields.social.facebook = facebook;
      if (linkedIn) profileFields.social.linkedIn = linkedIn;
      if (instagram) profileFields.social.instagram = instagram;

      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json({ profile });
      }

      //create
      profile = new Profile(profileFields);
      await profile.save();
      return res.json({ profile });
    } catch (error) {
      console.error(error.message);
    }
  }
);

//@route   GET api/profile/
//@desc    Get all user profile
//@access  Public
//@algo    fetch all user profile
//         return
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

//@route   GET api/profile/user/:user_id
//@desc    Get profile by user ID
//@access  Public
//@algo    fetch user details using params
//         return if found
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "User profile doesnot exists." });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "User profile doesnot exists." });
    }
    res.status(500).send("Server error.");
  }
});

//@route   DELETE api/profile
//@desc    Delete profile, user and post
//@access  Private
//@algo    find and delete profile and user
//         return delete message
router.delete("/", auth, async (req, res) => {
  try {
    //remove profile
    await Profile.findOneAndDelete({ user: req.user.id });
    //remove user
    await User.findOneAndDelete({ _id: req.user.id });
    res.json({ msg: "User deleted." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

//@route   PUT api/profile/experience
//@desc    Add profile experience
//@access  Private
//@algo    check title, company, from
//         create new exp object
//         save (unshift)
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required.").not().isEmpty(),
      check("company", "Company is required.").not().isEmpty(),
      check("from", "From date is required.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, company, location, from, to, current, description } =
        req.body;

      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      };

      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);
      await profile.save();

      res.json(profile);

      res.json({ msg: "New experience added." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error.");
    }
  }
);

//@route   DELETE api/profile/experience/:exp_id
//@desc    Delete experience from profile array
//@access  Private
//@algo    find user profile
//         get the index
//         remove -> splice
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

//@route   PUT api/profile/education
//@desc    Add profile education
//@access  Private
//@algo    check school, degree etc.
//         create new edu object
//         save (unshift)
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required.").not().isEmpty(),
      check("degree", "Degree is required.").not().isEmpty(),
      check("fieldOfStudy", "Field of Study is required.").not().isEmpty(),
      check("from", "From date is required.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { school, degree, fieldOfStudy, from, to, current, description } =
        req.body;

      const newEdu = {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description,
      };

      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);
      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error.");
    }
  }
);

//@route   DELETE api/profile/education/:edu_id
//@desc    Delete education from profile array
//@access  Private
//@algo    find user profile
//         get the education index
//         remove -> splice
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

//@route   GET api/profile/github/:username
//@desc    Get user repos from GitHub
//@access  Public
//@algo
//
//
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode != 200) {
        return res.status(404).json({ msg: "No Github profile found." });
      }
      res.json(JSON.parse(body));
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

module.exports = router;
