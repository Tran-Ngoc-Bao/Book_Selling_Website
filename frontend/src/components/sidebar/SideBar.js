import React, { useEffect, useRef, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {
  updategenreasync,
  initialload,
  updatesortasync
} from "../../redux/features/product/productSlice";

function Sidebar() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialload());
  }, []);
  const { filter } = useSelector(state => state.product);
  const [state, setState] = useState(null);
  const filters = ["Văn học", "Khoa học", "Thần thoại", "Lịch sử", "Huyền bí"];
  const [selectedOption, setSelectedOption] = useState("option1");
  const handleOptionChange = (event) => {
    const a=event.target.value
    setSelectedOption(a); // Update the selected option when a radio button is clicked
    dispatch(updatesortasync(a))
    
  };

  const arr = useRef(filter.genre);

  const handleCheckboxChange = async (tag) => {
    // Check if the tag is already in the array
    const tagIndex = arr.current.indexOf(tag);
    let newArr = [];

    if (tagIndex !== -1) {
      // If the tag is found, remove it from the array
      newArr = [
        ...arr.current.slice(0, tagIndex),
        ...arr.current.slice(tagIndex + 1),
      ];
    } else {
      // If the tag is not found, add it to the array
      newArr = [...arr.current, tag];
    }

    arr.current = newArr; // Update the ref with the new array
    setState(newArr);
    dispatch(updategenreasync(newArr)); // Dispatch the updated array to Redux store
  };

  return (
    <div>
      <form>
        <h3>Chọn thể loại</h3>
        {filters.map((tag, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                value={tag}
                checked={arr.current.includes(tag)}
                onChange={() => handleCheckboxChange(tag)}
              />
              {tag}
            </label>
          </div>
        ))}
      </form>

      <div>
      <form>
      <h3>Sắp xếp theo</h3>
        <label>
          <input
            type="radio"
            value="default"
            checked={selectedOption === "default"}
            onChange={handleOptionChange}
          />
          Mặc định
        </label>
        <label>
          <input
            type="radio"
            value="sold"
            checked={selectedOption === "sold"}
            onChange={handleOptionChange}
          />
          Bán chạy nhất
        </label>
        <label>
          <input
            type="radio"
            value="rate"
            checked={selectedOption === "rate"}
            onChange={handleOptionChange}
          />
          Đánh giá tốt nhất
        </label>
      </form>
      </div>
    </div>
  );
}

export default Sidebar;
