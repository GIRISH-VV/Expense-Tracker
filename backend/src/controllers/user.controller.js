import User from "../models/user.model.js";

export const updateProfile = async (req, res) => {
  try {
    const { name, email} = req.body;

    const user = await User.findById(req.user._id);

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    return res.status(200).json({success: true, message: "Profile updated successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};