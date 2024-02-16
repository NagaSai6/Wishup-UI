interface HTMLElementWithData extends HTMLElement {
  data?: string; // Define any additional properties you expect on the HTMLElement
}

import ejs from "ejs";

async function fetchDataFromAPI() {
  try {
    const response = await fetch("https://community.wishup.co/api/topvastats");
    if (!response.ok) {
      throw new Error("Failed to fetch data from API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Function to render HTML from data
async function renderHTML(data: any): Promise<string> {
    // Render HTML based on the fetched data
    return new Promise((resolve, reject) => {
      ejs.renderFile("../../views/topvastat.ejs", { data: data }, (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
    });
  }

function prependToBody(html: string): void {
  const body = document.getElementsByTagName("body")[0];
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  body.insertBefore(tempDiv.firstChild as Node, body.firstChild);
}


export default async function fetchDataAndRenderHTML() {
    const data = await fetchDataFromAPI();
    if (data) {
      try {
        const html = await renderHTML(data);
        prependToBody(html);
      } catch (error) {
        console.error("Error rendering HTML:", error);
      }
    }
  }