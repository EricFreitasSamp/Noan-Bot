module.exports = [{
    name: "ev",
    code: `
    $eval[$message]
    
    $onlyForIDs[$botOwnerId;]
    `
}, {
    name: "up",
    code: `
    $updatecommands
    $deletecommand
    $onlyForIDs[$botOwnerID;]
    `
}]