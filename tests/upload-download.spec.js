const excelJS = require('exceljs');
const {test, expect} = require('@playwright/test');

async function readExcelFile(worksheet,searchText){
    let output = {row:0,column:0};

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if(cell.value === searchText){
                console.log("row:", rowNumber,"column:", colNumber);
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });

    return output;
} 

//Replaces text to specified text
async function writeExcelFile(searchText,updatedText,filePath){
    const workbook = new excelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcelFile(worksheet,searchText);

    const cell = worksheet.getCell(output.row,output.column); //row, column
    cell.value = updatedText //Replace Text in cell var to this value
    await workbook.xlsx.writeFile(filePath);
    console.log(searchText, "value changed to", updatedText);
}


//Replaces price of a selected fruit_name
async function changePrice(fruit,updatedPrice,change,filePath){
    const workbook = new excelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcelFile(worksheet,fruit);

    const cell = worksheet.getCell(output.row,output.column+change.colChange); //row, column + 2 from colChange
    cell.value = updatedPrice //Replace price in cell var to this value
    await workbook.xlsx.writeFile(filePath);
    console.log(fruit,"price is changed to", updatedPrice);
}

//Can only pick one to use, only one works at a time??
// writeExcelFile("iPhone","Apple","excelDownloadTest.xlsx");
// changePrice("Mango",900,{rowChange:0, colChange:2},"excelDownloadTest.xlsx");

test('Upload download excel validation', async({page})=>{
    const textSearch = 'Mango';
    const updateValue = '350';

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name: "Download"}).click();
    await downloadPromise;

    changePrice(textSearch,updateValue,{rowChange:0, colChange:2},"/Downloads/download.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("/Downloads/download.xlsx");

    const textLocator = page.getByText(textSearch);
    const desiredRow = page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
});