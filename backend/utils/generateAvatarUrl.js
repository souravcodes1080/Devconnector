const generateAvatar = (name, colors) => {
  // Simple hash from name string
  const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % colors.length;
  const color = colors[index];
  const encodedName = encodeURIComponent(name.trim());
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodedName}&backgroundColor=${color}`;
};

module.exports = generateAvatar;
