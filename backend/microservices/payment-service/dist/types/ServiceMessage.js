"use strict";
// -> I m managing my service communication with this 'ServiseMessage' I defined generic
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceMessage = void 0;
class ServiceMessage {
    constructor(isSucceed, message, data) {
        this.IsSucceed = isSucceed;
        this.Message = message;
        if (data !== undefined) {
            this.Data = data;
        }
    }
}
exports.ServiceMessage = ServiceMessage;
//# sourceMappingURL=ServiceMessage.js.map