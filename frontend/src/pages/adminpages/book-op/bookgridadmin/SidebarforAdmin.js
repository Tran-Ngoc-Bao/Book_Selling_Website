import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updategenreasync,
  initialload,
  updatesortasync,
} from "../../../../redux/features/product/productSlice";
import styles from "./SidebarforAdmin.module.css"; // Import the CSS module

function SidebarforAdmin() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialload());
  }, [dispatch]);

  const { filter } = useSelector((state) => state.product);
  const [state, setState] = useState(null);
  const filters = ["Văn học", "Khoa học", "Thần thoại", "Lịch sử", "Huyền bí"];
  const [selectedOption, setSelectedOption] = useState("default");

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value); // Update the selected option when a radio button is clicked
    dispatch(updatesortasync(value));
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
    <div className={styles.SidebarforAdmincontainer}>
      <div className={styles.genres}>
        <form>
          <h3>Chọn thể loại</h3>
          <div>
            {filters.map((tag, index) => (
              <div key={index} className={styles.filterTag}>
                <span>
                  <input
                    type="checkbox"
                    value={tag}
                    checked={arr.current.includes(tag)}
                    onChange={() => handleCheckboxChange(tag)}
                  />
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </form>
      </div>

      <div className={styles.sortby}>
        <form>
          <h3>Sắp xếp theo</h3>
          <div className={styles.filterTag}>
            <span>
              <input
                type="radio"
                value="default"
                checked={selectedOption === "default"}
                onChange={handleOptionChange}
              />
              Mặc định
            </span>
          </div>
          <div className={styles.filterTag}>
            <span>
              <input
                type="radio"
                value="sold"
                checked={selectedOption === "sold"}
                onChange={handleOptionChange}
              />
              Bán chạy nhất
            </span>
          </div>
          <div className={styles.filterTag}>
            <span>
              <input
                type="radio"
                value="rate"
                checked={selectedOption === "rate"}
                onChange={handleOptionChange}
              />
              Đánh giá tốt nhất
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SidebarforAdmin;
