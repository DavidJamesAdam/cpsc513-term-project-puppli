import "../../styles/rankings.css";
import rankOneIcon from "./rankOne.svg";
import rankTwoIcon from "./rankTwo.svg";
import rankThreeIcon from "./rankThree.svg";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

interface RankItemProps {
  petName: string;
  rank: number;
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

export default function RankItem({ petName, rank }: RankItemProps) {
  return (
    <>
      <div className="rankItem">
        <TableCell>
          {rank < 4 ? (
            <img src={getBadge(rank)} alt="" />
          ) : (
            getCustomBadge(rank)
          )}
        </TableCell>
        <TableCell>
          <div className="petItem">
            <h1 className="name">{petName}</h1>
            <img src={rankOneIcon} alt="example.svg" />
          </div>
        </TableCell>
      </div>
    </>
  );
}
