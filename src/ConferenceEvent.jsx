import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";
import { toggleMealSelection, setNumberOfPeople } from "./mealsSlice";
const ConferenceEvent = () => {
    const [showItems, setShowItems] = useState(false);
    const [activeSection, setActiveSection] = useState('venue');
    const venueItems = useSelector((state) => state.venue);
    const avItems = useSelector((state) => state.av);
    const mealsData = useSelector((state) => state.meals);
    const dispatch = useDispatch();
    const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity;

    
    const handleToggleItems = () => {
        console.log("handleToggleItems called");
        setShowItems(!showItems);
    };

    const handleAddToCart = (index) => {
        if (venueItems[index].name === "Auditorium Hall (Capacity:200)" && venueItems[index].quantity >= 3) {
          return; 
        }
        dispatch(incrementQuantity(index));
      };
    
      const handleRemoveFromCart = (index) => {
        if (venueItems[index].quantity > 0) {
          dispatch(decrementQuantity(index));
        }
      };
    const handleIncrementAvQuantity = (index) => {
        dispatch(incrementAvQuantity(index));
    };

    const handleDecrementAvQuantity = (index) => {
        dispatch(decrementAvQuantity(index));
    };

    const handleMealSelection = (index) => {
        dispatch(toggleMealSelection(index));
    };

    const handleNumberOfPeopleChange = (value) => {
        const numValue = Math.max(1, Math.min(1000, parseInt(value) || 1));
        dispatch(setNumberOfPeople(numValue));
    };

    const getItemsFromTotalCost = () => {
        const items = [];
        
        venueItems.forEach(item => {
            if (item.quantity > 0) {
                items.push({ ...item, type: 'venue' });
            }
        });
        
        avItems.forEach(item => {
            if (item.quantity > 0) {
                items.push({ ...item, type: 'addon' });
            }
        });
        
        mealsData.selectedMeals.forEach(meal => {
            if (meal.selected) {
                items.push({ ...meal, quantity: mealsData.numberOfPeople, type: 'meal' });
            }
        });
        
        return items;
    };

    const items = getItemsFromTotalCost();

    const ItemsDisplay = ({ items }) => {
        return (
            <div className="items-list">
                {items.map((item, index) => (
                    <div key={index} className="item-detail">
                        <span>{item.name}</span>
                        <span>Qty: {item.quantity}</span>
                        <span>${item.cost * item.quantity}</span>
                    </div>
                ))}
            </div>
        );
    };
    const calculateTotalCost = (section) => {
        let totalCost = 0;
        if (section === "venue") {
          venueItems.forEach((item) => {
            totalCost += item.cost * item.quantity;
          });
        } else if (section === "av") {
          avItems.forEach((item) => {
            totalCost += item.cost * item.quantity;
          });
        } else if (section === "meals") {
          mealsData.selectedMeals.forEach((meal) => {
            if (meal.selected) {
              totalCost += meal.cost * mealsData.numberOfPeople;
            }
          });
        }
        return totalCost;
      };
    
    const venueTotalCost = calculateTotalCost("venue");
    const avTotalCost = calculateTotalCost("av");
    const mealsTotalCost = calculateTotalCost("meals");
    const totalCosts = {
        venue: venueTotalCost,
        av: avTotalCost,
        meals: mealsTotalCost,
        total: venueTotalCost + avTotalCost + mealsTotalCost
    };

    const navigateToProducts = (idType) => {
        const section = idType.replace('#', '');
        setActiveSection(section);
        if (showItems) {
            setShowItems(false);
        }
        // Smooth scroll to section
        setTimeout(() => {
            document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    return (
        <>
            <navbar className="navbar_event_conference">
                <div className="company_logo">Conference Expense Planner</div>
                <div className="left_navbar">
                    <div className="nav_links">
                        <a href="#venue" 
                           className={activeSection === 'venue' ? 'active' : ''}
                           onClick={() => navigateToProducts("#venue")}>Venue</a>
                        <a href="#addons" 
                           className={activeSection === 'addons' ? 'active' : ''}
                           onClick={() => navigateToProducts('#addons')}>Add-ons</a>
                        <a href="#meals" 
                           className={activeSection === 'meals' ? 'active' : ''}
                           onClick={() => navigateToProducts('#meals')}>Meals</a>
                    </div>
                    <div className="summary-info">
                        <span className="items-count">
                            {items.length} items selected
                        </span>
                        <button className="details_button" onClick={() => setShowItems(!showItems)}>
                            {showItems ? 'Back to Selection' : 'Show Details'}
                        </button>
                    </div>
                </div>
            </navbar>
            <div className="main_container">
                {!showItems
                    ?
                    (
                        <div className="items-information">
                             <div id="venue" className="venue_container container_main">
        <div className="text">
 
          <h1>Venue Room Selection</h1>
        </div>
        <div className="venue_selection">
          {venueItems.map((item, index) => (
            <div className="venue_main" key={index}>
              <div className="img">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="text">{item.name}</div>
              <div>${item.cost}</div>
     <div className="button_container">
        {venueItems[index].name === "Auditorium Hall (Capacity:200)" ? (

          <>
          <button
            className={venueItems[index].quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
            onClick={() => handleRemoveFromCart(index)}
          >
            &#8211;
          </button>
          <span className="selected_count">
            {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
          </span>
          <button
            className={remainingAuditoriumQuantity === 0? "btn-success btn-disabled" : "btn-success btn-plus"}
            onClick={() => handleAddToCart(index)}
          >
            &#43;
          </button>
        </>
        ) : (
          <div className="button_container">
           <button
              className={venueItems[index].quantity ===0 ? " btn-warning btn-disabled" : "btn-warning btn-plus"}
              onClick={() => handleRemoveFromCart(index)}
            >
               &#8211;
            </button>
            <span className="selected_count">
              {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
            </span>
            <button
              className={venueItems[index].quantity === 10 ? " btn-success btn-disabled" : "btn-success btn-plus"}
              onClick={() => handleAddToCart(index)}
            >
             &#43;
            </button>
            
            
          </div>
        )}
      </div>
            </div>
          ))}
        </div>
        <div className="total_cost">Total Cost: ${venueTotalCost}</div>
      </div>

                            {/*Necessary Add-ons*/}
                            <div id="addons" className="venue_container container_main">
                                <div className="text">
                                    <h1>Add-ons Selection</h1>
                                </div>
                                <div className="venue_selection">
                                    {avItems.map((item, index) => (
                                        <div className="venue_main" key={index}>
                                            <div className="img">
                                                <img 
                                                    src={item.img} 
                                                    alt={item.name}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                                                    }}
                                                />
                                            </div>
                                            <div className="text">{item.name}</div>
                                            <div>${item.cost}</div>
                                            <div className="button_container">
                                                <button
                                                    className={item.quantity === 0 ? "btn-warning btn-disabled" : "btn-warning btn-minus"}
                                                    onClick={() => handleDecrementAvQuantity(index)}
                                                >
                                                    &#8211;
                                                </button>
                                                <span className="selected_count">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className={item.quantity === 10 ? "btn-success btn-disabled" : "btn-success btn-plus"}
                                                    onClick={() => handleIncrementAvQuantity(index)}
                                                >
                                                    &#43;
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="total_cost">Total Cost: ${avTotalCost}</div>
                            </div>

                            {/* Meal Section */}
                            <div id="meals" className="venue_container container_main">
                                <div className="text">
                                    <h1>Meals Selection</h1>
                                </div>
                                <div className="input-container">
                                    <label htmlFor="numberOfPeople">Number of People:</label>
                                    <input
                                        type="number"
                                        id="numberOfPeople"
                                        min="1"
                                        max="1000"
                                        value={mealsData.numberOfPeople}
                                        onChange={(e) => handleNumberOfPeopleChange(e.target.value)}
                                        placeholder="Enter number of people"
                                    />
                                </div>
                                <div className="meal_selection">
                                    {mealsData.selectedMeals.map((meal, index) => (
                                        <div key={index} className="meal_item">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={meal.selected}
                                                    onChange={() => handleMealSelection(index)}
                                                />
                                                {meal.name} - ${meal.cost} per person
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className="total_cost">Total Cost: ${mealsTotalCost}</div>
                            </div>
                            <div className="footer-spacer"></div>
                        </div>
                    ) : (
                        <div className="total_amount_detail">
                            <TotalCost totalCosts={totalCosts} handleClick={handleToggleItems} ItemsDisplay={() => <ItemsDisplay items={items} />} />
                        </div>
                    )
                }
            </div>
        </>

    );
};

export default ConferenceEvent;
