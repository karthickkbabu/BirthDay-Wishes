function sendBirthdayWishes(){  
    var spreadsheetId = SpreadsheetApp.openById('---Your Spreadsheet ID----');
    var sheet = spreadsheetId.getSheetByName('---Your Spreadsheet Sheet Name----');
    var templateId = "---Your Tempate Google Word Doc ID----";
    var cDate = new Date();
     for(var i =2 ;i<=sheet.getLastRow(); i++){  
        var bDate = sheet.getRange(i,3).getValue();  
        if(cDate.getDate()==bDate.getDate()){
            if(cDate.getMonth()==bDate.getMonth()){
              var name = sheet.getRange(i,1).getValue();
              var toMail= sheet.getRange(i,2).getValue();
              var docId = DriveApp.getFileById(templateId).makeCopy('temp').getId();
              var doc = DocumentApp.openById(docId);
              var body = doc.getBody();
              body.replaceText('#name#',name);
              doc.saveAndClose();
              var url = "https://docs.google.com/feeds/download/documents/export/Export?id="+docId+"&exportFormat=html";
              var param = {
                method : "get",
                headers : {"Authorization": "Bearer " +     ScriptApp.getOAuthToken()}
              };
              var htmlBody = UrlFetchApp.fetch(url,param).getContentText();
              var trashed = DriveApp.getFileById(docId).setTrashed(true);
              MailApp.sendEmail(toMail,'Happy BirthDay to '+name,' ' ,{htmlBody : htmlBody});                
            }
        }
     }
}

