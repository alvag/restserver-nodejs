const Role = require('../models/role.model');
const User = require('../models/user.model');

const isValidRole = async (role = '') => {
    const existsRole = await Role.findOne({ role });
    if (!existsRole) {
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
};

const emailExists = async (email = '') => {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error(`El correo ${email} ya está registrado`);
    }
};

const idExists = async (id = '') => {
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error(`El id ${id} no existe`);
    }
};

module.exports = {
    isValidRole,
    emailExists,
    idExists,
};
