import { Competitor } from "./Competitor";
import CompetitorItem from "./CompetitorItem";

const CompetitorList: React.FC<{ competitors: Competitor[] }> = ({
  competitors,
}) => {
  return (
    <div className=" ">
      {competitors.map((competitor, index) => (
        <CompetitorItem key={index} competitor={competitor} />
      ))}
    </div>
  );
};

export default CompetitorList;
