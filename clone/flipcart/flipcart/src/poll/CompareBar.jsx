import { Link } from 'react-router-dom';

function CompareBar({ compareList, setCompareList }) {
  if (compareList.length === 0) return null;
  return (
    <div className="fixed bottom-0 w-full bg-gray-200 p-2 flex items-center justify-between">
      <div>{compareList.length} selected</div>
      <Link to="/compare">
        <button className="bg-green-500 text-white p-2 rounded">Compare Now</button>
      </Link>
    </div>
  );
}

export default CompareBar;