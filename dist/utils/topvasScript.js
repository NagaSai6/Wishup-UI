"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = __importDefault(require("ejs"));
function fetchDataFromAPI() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://community.wishup.co/api/topvastats");
            if (!response.ok) {
                throw new Error("Failed to fetch data from API");
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    });
}
// Function to render HTML from data
function renderHTML(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Render HTML based on the fetched data
        return new Promise((resolve, reject) => {
            ejs_1.default.renderFile("../../views/topvastat.ejs", { data: data }, (err, html) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(html);
                }
            });
        });
    });
}
function prependToBody(html) {
    const body = document.getElementsByTagName("body")[0];
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    body.insertBefore(tempDiv.firstChild, body.firstChild);
}
function fetchDataAndRenderHTML() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetchDataFromAPI();
        if (data) {
            try {
                const html = yield renderHTML(data);
                prependToBody(html);
            }
            catch (error) {
                console.error("Error rendering HTML:", error);
            }
        }
    });
}
exports.default = fetchDataAndRenderHTML;
