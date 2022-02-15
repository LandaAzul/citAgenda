const {verifyToken} = require('./authjwt')
const {esSocio} = require('./authjwt')
const {estaActivo} = require('./authjwt')
const {esProfesor} = require('./authjwt')
const {esAdministrador} = require('./authjwt')
const {checkRolesExisted} = require('./verifySingUp')
const {checkDuplicateDocumentOrCodigoOrEmail} = require('./verifySingUp')
//export {verifyToken};
//module.exports = verifyToken;
module.exports = { verifyToken, esSocio, esProfesor , esAdministrador, checkRolesExisted, estaActivo, checkDuplicateDocumentOrCodigoOrEmail}
