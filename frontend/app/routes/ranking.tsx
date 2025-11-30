import type { Route } from "./+types/ranking";
import Header from "../components/header/header";
import rankingIcon from "../components/rankings/rankingIcon.svg";
import "../styles/rankings.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import rankOneIcon from "../components/rankings/rankOne.svg";
import rankTwoIcon from "../components/rankings/rankTwo.svg";
import rankThreeIcon from "../components/rankings/rankThree.svg";
import { authCheck } from "~/utils/authCheck";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import petPFP from "../components/profile/defaultPetPFP.svg";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ranking" },
    { name: "description", content: "ranking page" },
  ];
}

export default function Ranking() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  // keeps track of which tab we are on
  const [value, setValue] = useState(0);

  const [globalList, setGlobalList] = useState([]);
  const [provincialList, setProvincialList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        await authCheck();
        setAuthorized(true);
      } catch (e) {
        window.location.href = "/login";
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await authCheck();
        setAuthorized(true);

        // Fetch the json for the global rankings
        const globalResponse = await fetch("http://localhost:8000/posts/rank/global");

        if (globalResponse.ok) {
          const globalData = await globalResponse.json();

          const onlyPetId = globalData.map((item: any) => item.petId); 

          setGlobalList(onlyPetId);
        }

        // // Fetch the json for the province rankings
        // const provinceResponse = await fetch("http://localhost:8000/posts/rank/province");

        // if (provinceResponse.ok) {
        //   const provincialData = await provinceResponse.json();

        //   const onlyPetId = provincialData.map((item: any) => item.petId); 

        //   setProvincialList(onlyPetId);
        // }

        // // Fetch the json for the city rankings
        // const cityResponse = await fetch("http://localhost:8000/posts/rank/city");

        // if (cityResponse.ok) {
        //   const cityData = await cityResponse.json();

        //   const onlyPetId = cityData.map((item: any) => item.petId); 

        //   setCityList(onlyPetId);
        // }

      } catch (e) {
        console.log("Failed to fetch data for global rankings.")
      }
    })();
  }, []);

  if (authorized === null) {
    return null;
  }

  // test data
  const data = [
    {
      rankIcon: rankOneIcon,
      image: rankingIcon,
      name: "Pet 1",
    },
    {
      rankIcon: rankTwoIcon,
      image: rankingIcon,
      name: "Pet 2",
    },
    {
      rankIcon: rankThreeIcon,
      image: rankingIcon,
      name: "Pet 3",
    },
    {
      rankIcon: undefined,
      image: rankingIcon,
      name: "Pet 4",
    },
    {
      rankIcon: undefined,
      image: rankingIcon,
      name: "Pet 5",
    },
  ];

  function changeTab(event: React.SyntheticEvent, value: any): void {
    // hightlight selected tab
    setValue(value);
  }

  // gets the correct svg based the rank
  function getBadge(rank: number) {
    if (rank === 1) {
      return rankOneIcon;
    } else if (rank === 2) {
      return rankTwoIcon;
    } else if (rank === 3) {
      return rankThreeIcon;
    }
  }

  // creates a custom svg with the given rank
  function getCustomBadge(rank: number) {
    return (
      <Paper id="customBadge" variant="outlined">
        {rank}
      </Paper>
    );
  }

  return (
    <>
      <Header />
      <main style={{ backgroundColor: "var{--bg-color}" }}>
        <div className="rankings">
          <img src={rankingIcon} alt="" />
          <h1 id="title">Rankings</h1>
        </div>
        <Tabs
          value={value}
          onChange={changeTab}
          centered={true}
          id="filterBar"
          variant="fullWidth"
        >
          <Tab label="Global" className="filterTab" />
          <Tab label="Provincial" className="filterTab" />
          <Tab label="Local" className="filterTab" />
        </Tabs>
        <Table>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                style={{ display: "flex", flexDirection: "row", justifyContent:"space-between", padding: "0px 40px", }}
                key={index}
                className={index % 2 === 0 ? "evenItem" : "oddItem"}
              >
                <TableCell className="badge">
                  {(index + 1) < 4 ? (
                    <img src={getBadge(index + 1)} alt="" />
                  ) : (
                    getCustomBadge(index + 1)
                  )}
                </TableCell>
                <TableCell>
                  <div className="petItem">
                    <h1 className="name">{row.name}</h1>
                    <img src={petPFP} alt="example.svg" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  );
}
