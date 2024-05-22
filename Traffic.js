// Function to perform an HTTPS GET request with proxy settings
function httpsRequest(url, proxyServer, username, password) {
    var xhr = new ActiveXObject("MSXML2.ServerXMLHTTP");
    xhr.setProxy(2, proxyServer);
    if (username && password) {
        xhr.setProxyCredentials(username, password);
    }
    xhr.open("GET", url, false);
    xhr.send();
    if (xhr.status == 200) {
        WScript.Echo("HTTPS Request Success: " + url);
    } else {
        WScript.Echo("HTTPS Request Failed: " + url + " with status: " + xhr.status);
    }
}

// Function to perform a DNS lookup through a proxy tunnel using nslookup
function dnsLookupThroughProxy(hostname, proxyServer) {
    var shell = new ActiveXObject("WScript.Shell");
    var command = 'cmd /c "set HTTP_PROXY=' + proxyServer + ' && nslookup ' + hostname + '"';
    var exec = shell.Exec(command);
    while (!exec.StdOut.AtEndOfStream) {
        WScript.Echo(exec.StdOut.ReadLine());
    }
}

// Function to check an SMB hostname
function checkSMB(hostname, sharename) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var path = "\\" + "\\" + hostname + "\\" + sharename; // Adjust as needed *** Edit ***
    try {
        if (fso.FolderExists(path)) {
            WScript.Echo("SMB Host " + hostname + " is reachable at " + path);
        } else {
            WScript.Echo("SMB Host " + hostname + " is not reachable or share does not exist at " + path);
        }
    } catch (e) {
        WScript.Echo("Error accessing SMB Host " + hostname + ": " + e.message);
    }
}

// Main script
var httpsUrl = "https://www.google.com";
var dnsHostname = "www.google.com";
var smbHostname = "127.0.0.1"; //*** Edit ***
var smbShareName = "Temp";  // Replace with your SMB share name *** Edit ***
var proxyServer = "127.0.0.1:8085";  // Replace with your proxy server and port
var username = "";  // Replace with your proxy username *** Edit ***
var password = "";  // Replace with your proxy password *** Edit ***

// Perform the HTTPS request 100 times
for (var i = 0; i < 100; i++) {
    httpsRequest(httpsUrl, proxyServer, username, password);
}

// Perform the DNS lookup 100 times
for (var i = 0; i < 100; i++) {
    dnsLookupThroughProxy(dnsHostname, proxyServer);
}

// Check the SMB hostname 100 times
for (var i = 0; i < 100; i++) {
    checkSMB(smbHostname, smbShareName);
}
