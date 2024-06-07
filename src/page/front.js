import { useEffect, useRef, useState } from "react";

function HomeGame() {
  const [heading, setheading] = useState(false);
  const [fetchs, setfetch] = useState(false);
  const [Prograssbar, setPro] = useState(false);
  const [Prowidth, SetWidth] = useState(0);
  const [inter, setinter] = useState(true)
  const [UserSelect, setSelect] = useState([]);
  const [Citys, SetCitys] = useState([]);
  const [index, SetCity] = useState(0);
  const [cops, Setcops] = useState([]);
  const [SlectCop, SetCop] = useState(0);
  const [cop, selectcop] = useState("first");
  const [Vechs, Setvec] = useState([]);
  const [selVec, selvec] = useState(0);
  const [ans, setAns] = useState({});
  const [ansSh, setSh] = useState(false);
  const nextbucity = useRef(null);
  const nextbuv = useRef(null);

  useEffect(() => {
    fetch("http://localhost:2002/citys")
      .then(res => res.json())
      .then(d => SetCitys(d));

    fetch("http://localhost:2002/cops")
      .then(res => res.json())
      .then(d => Setcops(d))

    fetch("http://localhost:2002/Vechels")
      .then(res => res.json())
      .then(d => Setvec(d))

    const timer = setTimeout(() => {
      setheading(true)
    }, 1500);
  }, []);

  const handle1 = (e) => {
    SetCity(parseInt(e.target.value));
  }
  const handlec = (e) => {
    SetCop(e.target.value);
    selectcop(cops[e.target.value].Name);
  }
  const handle2 = () => {



    console.log(index);
    if (!fetchs) {

      const data =
      {
        cop: cops[SlectCop].Name,
        copImage: cops[SlectCop].image,
        city: Citys[index].City,
        cityImage: Citys[index].image,
        Vech: Vechs[selVec].kind,
        VechImage: Vechs[selVec].image
      }
      if (index == Citys.length - 1) {
        nextbucity.current.click();
      } if (selVec == Vechs.length - 1) {
        nextbuv.current.click();
      }

      setSelect((p) => [...p, data]);
      console.log(UserSelect);


      if (index < Citys.length) {
        let reoveC = Citys.splice(index, 1);
        console.log(Citys);
        console.log(index, "less");
        SetCitys(Citys);
      }
      let c = [...Citys];
      SetCitys(c);
    }

    if (cops.length > 1) {
      let removeCo = cops.splice(SlectCop, 1);
      let removeV = Vechs.splice(selVec, 1);

    } else {
      if (fetchs) {
        setinter(false)
        setPro(true)
        Go();
      }

      setfetch(true);
    }
    Setcops(cops);
    Setvec(Vechs);

    selectcop(cops[0].Name);
    SetCity(0);
    SetCop(0);
    selvec(0);

    if (setPro) {
      let f = setInterval(() => {
        SetWidth(prov => {
          if (prov >= 100) {
            clearInterval(f);
            setPro(false);
            setSh(true);
            return 100;
          }
          return prov + 10;
        })
      }, 10000)
    }

    console.log(Citys);
  }

  const Go = async () => {
    try {
      let resopn = await fetch("http://localhost:2002/Play", {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify(UserSelect)
      })
        .then(res => res.json())
        .then(d => setAns(d));

    } catch (error) {
      alert(error);
    }
  }
  // console.log(UserSelect);
  return (
    <>
      <div className="container text-center mt-lg-5">
        {heading &&
          <h1 className="text-black text text-white" >Find a Fugitive Criminal</h1>
        }
      </div>
      <div className="container mt-lg-5">
        {heading &&

          <div className="mt-4 p-lg-4 text-white rounded" style={{ border: "3px solid white" }}>
            {inter && <>
              <h3 className="text-center">Select of city for each cop</h3>
              <h5 className="text-center">Select {cop} Cop City</h5>
              <br />
              <p>

                Cops Asign:
              </p>
              {cops.length > 0 && cops?.map((v, i) => (
                <>
                  <label>{v.Name} Cop</label> <input type="checkbox" value={i} name="cops" onChange={handlec} checked={SlectCop == i} ></input><br />
                </>
              ))}

              <br />
              <br />
              <p className="text-center">
                Select City:
              </p>
              <div style={{ width: "90%", height: "550px", margin: "auto" }}>
                <div id="carouselExample" className="carousel slide" style={{ width: "100%", height: "100%" }}>
                  <div className="carousel-inner" style={{ width: "100%", height: "100%" }}>
                    {Citys?.map((v, i) => (

                      <div key={i} className={`carousel-item ${i === 0 && "active"}`}>
                        <p> City Name: {v.City}</p>
                        <p>Distance:{v.Distance}</p>
                        <input type="Checkbox" value={i} onChange={handle1} checked={index == i || i == 0} />
                        <img src={v.image} className="d-block w-100" alt="..." />
                      </div>
                    ))}
                  </div>

                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                    style={{ height: "200px", marginTop: "200px" }}
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    ref={nextbucity}
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                    style={{ height: "200px", marginTop: "200px" }}
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                  </button>

                </div>
              </div>
              <br>
              </br>
              <p>
              </p>
              <p className="text-center">
                Select Vehicle:
              </p>
              <div style={{ width: "90%", height: "550px", margin: "auto" }}>
                <div id="carouselExample2" className="carousel slide" style={{ width: "100%", height: "100%" }}>
                  <div className="carousel-inner" style={{ width: "100%", height: "100%" }}>
                    {Vechs?.map((v, i) => (
                      <div key={i} className={`carousel-item ${i === 0 && "active"}`}>
                        <p> Vehicle Name: {v.kind}</p>
                        <p>Range:{v.Range}</p>
                        <input type="Checkbox" value={i} onChange={(e) => selvec(e.target.value)} checked={selVec == i} />
                        <img src={v.image} className="d-block w-100" alt="..." />
                      </div>
                    ))}
                  </div>

                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample2"
                    data-bs-slide="prev"
                    style={{ height: "200px", marginTop: "200px" }}
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample2"
                    data-bs-slide="next"
                    ref={nextbuv}
                    style={{ height: "200px", marginTop: "200px" }}
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                  </button>

                </div>
              </div>


              <br />
              <button className="btn btn-dark text-white text-center" onClick={handle2}>Done</button>
            </>
            }
            {Prograssbar && <>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow={0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ width: `${Prowidth}%` }}
                >
                  <span className="sr-only">{Prowidth}% Complete</span>
                </div>
              </div>

            </>}
            {ansSh &&
              <>
                <p></p>
                {Object.keys(ans).length >= 1 ? <>
                  <div style={{ width: "40%", height: "200px", margin: "auto" }}>
                    <img src={ans.copImage} alt="" style={{ width: "100%", heigth: "100%" }} />
                  </div>
                  <p></p>
                  <p className="text-center text-white">{ans.cop} Cop Capture Fugitive Criminal in {ans.city} </p><p className="text-center text-white">Thanks For Play</p><p className="text-center text-white"><button className="btn btn-block text-white" onClick={() => { window.location.reload(); }}>Try Aagin</button></p></> : <><p className="text-center text-white"> Criminal Not Capture</p><p className="text-center text-white">Thanks For Play</p><p className="text-center text-white"><button className="text-center text-white" onClick={() => { window.location.reload(); }}>Try Aagin</button></p></>}

              </>}

          </div>

        }

      </div>

    </>
  );
}

export default HomeGame;