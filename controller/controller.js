const fs = require('fs');

module.exports = {
  getAbout: getAbout,
  getEats: getEats,
  getCheers: getCheers,
  getTreat: getTreat,
  submitDeal: submitDeal
}

/** @function list
  * Lists the students
  */
function getAbout(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.end(fs.readFileSync('./views/about.html'));
}

function getEats(req, res) {
  // call function to load cards
  loadHtml(res, req, './data/food.json');
}

function getCheers(req, res) {
  loadHtml(res, req, './data/drinks.json');
}

function getTreat(req, res) {
  loadHtml(res, req, './data/treats.json');
}

function submitDeal(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.end(fs.readFileSync('./views/submitDeal.html'));
}

// Loads HTML with deal data
function loadHtml(res, req, dataFilePath){
  res.setHeader('Content-Type', 'text/html');

  var html = fs.readFileSync('./views/template.html');
  var data = JSON.parse(fs.readFileSync(dataFilePath));

  var count = 1;

  // sets up card container div
  html += '<div id="card-container">';
  
  // loops through all deals in data
  for (deal in data.deals){

    // Sets up row div
    if((count%4) === 1)
      html += '<div class="row" id="row-adj">';

    html += '<div class="col-3">';
    html += '   <div class="card" style="width: 100% height: 100%">';
    html += '    <img class="card-img-top" src="' + data.deals[deal].image+ '" alt="Card image cap">';
    html += '     <div class="card-body">';
    html += '     <h4 class="card-title">'+ data.deals[deal].name + '</h4>';
    html += '     <p id="card-description" class="card-text">' + data.deals[deal].desc + '</p>';
    html += '     <label for ="card-expiration" id="expiration-label">Expires: </label>';
    html += '     <p name="card-expiration" id="card-expiration">'+ data.deals[deal].expires + '</p>';
    html += '     <a href="' + data.deals[deal].link + '" target="_blank" id="card-btn" class="btn btn-primary">Visit: ' + data.deals[deal].name + '</a>';
    html += '   </div>';
    html += ' </div>';
    html += '</div>';

    // closes row div
    if((count%4) === 0)
      html += '</div>';

    count++;
  }

  // closes card container div
  html += '</div>';
  html+= getFooter();
  
  res.end(html);
}

function getFooter(){
  return '<footer> <div class="container-fluid" id="footer-nav"> <p> Mitch Gehrt, Garrett Blehm, Olivia Baalman &copy; 2018 All Rights Reserved </p> </div></footer><script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"/><script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"/><script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js"/><script src=".\bootstrap-4.0.0-alpha.6-dist\js\bootstrap.min.js"/></body></html>';
}