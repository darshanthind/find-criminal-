const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


let CityS = [
  {
    City: "Yapkashnagar City",
    Distance: "60 KM",
    image: "imges/Screenshot 2024-04-30 182257.png"
  },
  {
    City: "Lihaspur City",
    Distance: " 50 KM",
    image: "imges/Screenshot 2024-04-30 184115.png"

  },
  {
    City: "Narmis City",
    Distance: "40 KM",
    image: "imges/Screenshot 2024-04-30 184315.png"
  },
  {
    City: "Shekharvati City",
    Distance: "30 KM",
    image: "imges/Screenshot 2024-04-30 184410.png"
  },
  {
    City: "Nuravgram City",
    Distance: "20 KM",
    image: "imges/Screenshot 2024-04-30 184506.png"
  }
];

let Vehicals = [
  {
    kind: "EV Bike",
    Range: "60 KM",
    Count: "2",
    image: "imges/Screenshot 2024-05-01 172050.png"
  },
  {
    kind: "EV Car",
    Range: "100 KM",
    Count: "1",
    image: "imges/Screenshot 2024-05-01 172142.png"
  }, {
    kind: "EV SUV",
    Range: "120 KM",
    Count: "1",
    image: "imges/Screenshot 2024-05-01 172240.png"
  }
];
let cops = [{
  Name: "First",
  image: "imges/Screenshot 2024-05-02 163640.png"
}, {
  Name: "Second",
  image: "imges/Screenshot 2024-05-02 163706.png"
}, {
  Name: "Third",
  image: "imges/Screenshot 2024-05-02 163729.png"
}]
CityS.sort((a, b) => b.Distance - a.Distance);
app.get("/citys", (req, res) => {

  // console.log(CityS);
  res.json(CityS);
});
app.get("/cops", (req, res) => {
  res.json(cops)
});
app.get("/Vechels", (req, res) => {
  res.json(Vehicals);
});

app.post("/Play", (req, res) => {
  // console.log(req.body);
  let Police = req.body;
  console.log(Police);
  let Criminal = Math.floor(0 + Math.random() * 5);
  let CriminalHid = CityS[Criminal];
  console.log(CriminalHid);

  for (let i of Police) {
    if (i.city == CriminalHid.City) {
      res.json(i);
    }
  }

})
app.listen(2002, console.log("server run..."))