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
import RankItem from "~/components/rankings/rankItem";
import { authCheck } from "~/utils/authCheck";

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
          <Tab label="Provincal" className="filterTab" />
          <Tab label="Local" className="filterTab" />
        </Tabs>
        <Table>
          {data.map((row, index) => (
            <TableRow
              key={index}
              className={index % 2 === 0 ? "evenItem" : "oddItem"}
            >
              <RankItem petName={row.name} rank={index + 1}></RankItem>
            </TableRow>
          ))}
        </Table>
      </main>
    </>
  );
}
