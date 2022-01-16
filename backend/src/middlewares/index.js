const {verifyToken} = require('./authjwt')
const {isUser} = require('./authjwt')
const {isModerator} = require('./authjwt')
const {isAdmin} = require('./authjwt')
const {checkRolesExisted} = require('./verifySingUp')
const {checkDuplicateDocumentOrCodigoOrEmail} = require('./verifySingUp')
//export {verifyToken};
//module.exports = verifyToken;
module.exports = { verifyToken, isUser,isModerator , isAdmin, checkRolesExisted, checkDuplicateDocumentOrCodigoOrEmail}
