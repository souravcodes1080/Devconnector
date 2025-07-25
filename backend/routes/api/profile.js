const express = require("express");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

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
    res.json({msg:"User deleted."});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

module.exports = router;
