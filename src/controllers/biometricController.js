const biometricModel =
    require('../models/biometricModel');

const verifyBiometric = async (req, res) => {

    try {

        const user_id = req.user.id;

        const session =
            await biometricModel.createVerification(
                user_id
            );

        res.status(201).json(session);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    verifyBiometric
};