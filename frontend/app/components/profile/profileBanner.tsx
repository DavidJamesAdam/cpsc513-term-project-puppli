import rankOneIcon from "../rankings/rankOne.svg";
import rankTwoIcon from "../rankings/rankTwo.svg";
import rankThreeIcon from "../rankings/rankThree.svg";
import "./profileBanner.css";

interface ProfileBannerProps {
  first: number;
  second: number;
  third: number;
}

export default function ProfileBanner({
  first,
  second,
  third,
}: ProfileBannerProps) {
  return (
    <div className="banner">
      <p className="award">
        <img src={rankOneIcon} alt="example.svg" className="icon" />
        <span> : {first}</span>
      </p>
      <p className="award">
        <img src={rankTwoIcon} alt="example.svg" className="icon" />
        <span> : {second}</span>
      </p>
      <p className="award">
        <img src={rankThreeIcon} alt="example.svg" className="icon" />
        <span> : {third}</span>
      </p>
    </div>
  );
}
