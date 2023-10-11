import "./styles.css";
import { useState, useEffect } from "react";
let handeltype = [
  "grass",
  "ghost",
  "electric",
  "bug",
  "poison",
  "normal",
  "fairy",
  "fire",
  "water",
  "ground"
];
export default function App() {
  const [Allpokemon, setAllpokemon] = useState([]); //iwant to store all the pokemon data
  //now we are going to offset dynamic
  //  const[offset,setoffset]=useState()

  const [URL, setURL] = useState(`
 https://pokeapi.co/api/v2/pokemon?limit=20`);
  // when i store the data i create the function for api call
  async function getAllPokemon() {
    //offset dynamic kar apn ate tr offset=${}ahi tak
    const rs = await fetch(URL); // offset=10 means whenever user comes my page i want to show 10 pokemon api=https://pokeapi.co/api/v2/pokemon?offset=10&limit=20
    const data = await rs.json();
    // console.log(data);
    setURL(data.next); //iam storing this next url inside setURL
    await GetDetailsinfo(data.results); // once i get the response and getdetailsinfo i pass the data.results
    // console.log(Allpokemon);
  }
  // i call the getallpokemon by useEffect
  useEffect(() => {
    getAllPokemon();
  }, []);
  // i got the data over here the data present inside the results. in result you see name,url
  //thats why we create another function.

  async function GetDetailsinfo(result) {
    //this result nothing but name and url inside reuslt
    //that why we create loop
    result.forEach(async (ePoke) => {
      const rs = await fetch(`
    https://pokeapi.co/api/v2/pokemon/${ePoke.name}`);
      const data = await rs.json();
      setAllpokemon((currentList) => [...currentList, data]);
    });
    // console.log(ePoke);

    // console.log(data);
    //iwant to store this data(GetDetauksifo) in setAllpokemon
  }

  return (
    <div id="Parent">
      <div id="section">
        <div className="content1">
          <h2>Pokemon</h2>
          <h2>Pokemon</h2>
        </div>
        <div className="content2">
          <h2>KingDom</h2>
          <h2>KingDom</h2>
        </div>
      </div>
      <div className="app-container">
        <div className="pokemon-container">
          <div className="all-container">
            {Allpokemon.map((ePoki) => {
              return <PokemonCard data={ePoki} />;
            })}
            <button className="load-more" onClick={() => getAllPokemon()}>
              More Pokemon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function PokemonCard({ data }) {
  const [overlayOpen, setoverlay] = useState(false); //when user is comes on page will state is close

  function handelralOverlay() {
    if (!overlayOpen) {
      setoverlay(true);
    }
  }

  let backgroundcard = handeltype.includes(data.types[0].type.name)
    ? data.types[0].type.name
    : "grass";

  let Image = data.sprites.other.dream_world.front_default;
  let id = data.id;

  let name = data.forms[0].name;
  let Type = data.types[0].type.name;

  let Height = data.height;
  let weight = data.weight;
  let stats1 = data.stats[0].stat.name;
  let stats2 = data.stats[1].stat.name;
  let stats3 = data.stats[2].stat.name;
  let stats4 = data.stats[3].stat.name;
  let stats5 = data.stats[4].stat.name;
  let stats6 = data.stats[5].stat.name;

  let bs1 = data.stats[0].base_stat;
  let bs2 = data.stats[1].base_stat;
  let bs3 = data.stats[2].base_stat;
  let bs4 = data.stats[3].base_stat;
  let bs5 = data.stats[4].base_stat;
  let bs6 = data.stats[5].base_stat;

  return (
    <>
      <div className={`thumb-container  ${backgroundcard}`}>
        <div className="number">
          <small>#{id}</small>
        </div>
        <img src={Image} alt="nothing" />
        <div className="detail-wrapper">
          <h3>{name}</h3>
          <small>Type : {Type}</small>
          <button className="infoBtn" onClick={handelralOverlay}>
            {" "}
            Know more...
          </button>
        </div>
      </div>
      {overlayOpen && (
        <Overlay
          setoverlay={setoverlay}
          name={name}
          img={Image}
          type={Type}
          Height={Height}
          weight={weight}
          stats1={stats1}
          stats2={stats2}
          stats3={stats3}
          stats4={stats4}
          stats5={stats5}
          stats6={stats6}
          bs1={bs1}
          bs2={bs2}
          bs3={bs3}
          bs4={bs4}
          bs5={bs5}
          bs6={bs6}
        />
      )}
    </>
  );
}

function Overlay({
  setoverlay,
  type,
  Height,
  name,
  img,
  weight,
  stats1,
  stats2,
  stats3,
  stats4,
  stats5,
  stats6,
  bs1,
  bs2,
  bs3,
  bs4,
  bs5,
  bs6
}) {
  return (
    <div className={`overlay ${type}`}>
      <button className={`closeBtn ${type}`} onClick={() => setoverlay(false)}>
        X
      </button>
      <div className="left-overlay">
        <img className="left-overlay-img" src={img} alt={name} />
        <h3 className="left-overlay-name">{name}</h3>
      </div>

      <div className={`right-overlay ${type}`}>
        <table className={`right-overlay-tabel ${type}`}>
          <tbody>
            <tr>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>weight :</td>
                      <td>{weight}</td>
                    </tr>
                    <tr>
                      <td>Height :</td>
                      <td>{Height}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>Stat1 :</td>
                      <td>{stats1}</td>
                    </tr>
                    <tr>
                      <td>Stat2 :</td>
                      <td>{stats2}</td>
                    </tr>
                    <tr>
                      <td>Stat3 :</td>
                      <td>{stats3}</td>
                    </tr>
                    <tr>
                      <td>Stat4 :</td>
                      <td>{stats4}</td>
                    </tr>
                    <tr>
                      <td>Stat5 :</td>
                      <td>{stats5}</td>
                    </tr>
                    <tr>
                      <td>Stat6 :</td>
                      <td>{stats6}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>Bs1:</td>
                      <td>{bs1}</td>
                    </tr>
                    <tr>
                      <td>Bs2:</td>
                      <td>{bs2}</td>
                    </tr>
                    <tr>
                      <td>Bs3:</td>
                      <td>{bs3}</td>
                    </tr>
                    <tr>
                      <td>Bs4:</td>
                      <td>{bs4}</td>
                    </tr>
                    <tr>
                      <td>Bs5:</td>
                      <td>{bs5}</td>
                    </tr>
                    <tr>
                      <td>Bs6:</td>
                      <td>{bs6}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
