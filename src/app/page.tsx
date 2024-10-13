"use client";
import { useEffect, useState } from "react";
import Card from "@/components/card";
import Button from "@/components/button";
import { Get } from "@/config/api-method";
import AppModal from "@/components/modal";

export default function Home() {
  const [activeTab, setActiveTab] = useState<any>("All meals");
  const [listData, setListData] = useState<any>([]);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isVisibleOpen, setIsVisibleOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [weekMeals, setWeekMeals] = useState<any>({
    "Week 1": [],
    "Week 2": [],
    "Week 3": [],
    "Week 4": [],
  });

  const tabs = ["All meals", "Week 1", "Week 2", "Week 3", "Week 4"];

  const getData = () => {
    Get("recipes")
      .then((res) => {
        setListData([...res.data.recipes]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // Add active card index and select the meal
  const handleCardClick = (index: number, meal: any) => {
    setActiveCard(index);
    setSelectedMeal(meal);
  };

  // Add selected meal to the selected week, preventing duplicates
  const saveMealToWeek = () => {
    if (selectedWeek && selectedMeal) {
      const mealExists = weekMeals[selectedWeek].some(
        (meal: any) => meal.name === selectedMeal.name
      );
      if (!mealExists) {
        setWeekMeals((prev: any) => ({
          ...prev,
          [selectedWeek]: [...prev[selectedWeek], selectedMeal],
        }));

        // Deselect the card and selected week
        setSelectedMeal(null);
        setActiveCard(null);
        setSelectedWeek(null);

        // Close the modal
        setIsVisibleOpen(false);
      } else {
        alert("This meal has already been added to the selected week!");
      }
    }
  };

  // Delete a meal from a specific week
  const deleteMealFromWeek = (week: string, index: number) => {
    setWeekMeals((prev: any) => ({
      ...prev,
      [week]: prev[week].filter((_: any, i: number) => i !== index),
    }));
  };

  const showVisible = () => {
    setIsVisibleOpen(true);
  };

  const handleOk = () => {
    // Close the modal and reset selected week
    setIsVisibleOpen(false);
    setSelectedWeek(null);
  };

  const handleCancel = () => {
    // Close the modal and reset selected week
    setIsVisibleOpen(false);
    setSelectedWeek(null);
  };

  return (
    <main className="min-h-screen homeSection">
      <div className="bannerSection">
        <div className="absolute inset-0 bg-cover bg-no-repeat bg-center bg-[url('../../public/bg-Img.png')]"></div>
        <div className="z-10 bannerContent">
          <h1 className="text-4xl font-bold text-gray-900">
            Optimize Your Meal
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Select meals to add to weeks. You can edit, modify, and change the
            meal weeks.
          </p>
        </div>
      </div>

      <div className="tabSection z-10">
        <div className="lg:container lg:mx-auto px-4 ">
          <h2>Week Orders</h2>
        </div>

        <div className="tabListDiv">
          <div className="tabList mb-[45px] lg:container lg:mx-auto px-4 ">
            <ul>
              {tabs.map((tab) => (
                <li
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer text-lg font-semibold ${
                    activeTab === tab ? "activeTab" : "Tab"
                  }`}
                >
                  {tab}
                </li>
              ))}
            </ul>
            <div>
              <Button
                label="Add to Week"
                className={`addBtn ${activeCard !== null ? "active" : null}`}
                onClick={() => {
                  if (activeCard !== null) {
                    showVisible(); // Open the modal when a card is selected
                  }
                }}
              />

              {/* Modal to select the week and save the meal */}
              <AppModal
                open={isVisibleOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                childern={
                  <div className="weekModal">
                    <h4>Select Week</h4>
                    <ul>
                      {tabs.slice(1).map((week) => (
                        <li
                          key={week}
                          className={`cursor-pointer ${
                            selectedWeek === week ? "selected" : ""
                          }`}
                          onClick={() => setSelectedWeek(week)}
                        >
                          {week}
                        </li>
                      ))}
                    </ul>
                    <Button
                      label="Save"
                      className={`saveBtn ${
                        selectedWeek ? "active" : "disabled"
                      }`}
                      onClick={saveMealToWeek}
                    />
                  </div>
                }
              />
            </div>
          </div>
        </div>

        {/* Display content based on active tab */}
        <div className="lg:container lg:mx-auto px-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {activeTab === "All meals"
              ? listData?.map((meal: any, i: any) => (
                  <Card
                    key={i}
                    className={`card ${activeCard === i ? "active" : ""}`}
                    title={meal.name}
                    desc={meal.instructions}
                    cardImg={meal.image}
                    onClick={() => handleCardClick(i, meal)}
                  />
                ))
              : weekMeals[activeTab]?.map((meal: any, i: any) => (
                  <div key={i} className="relative">
                    <Card
                      className={`card ${activeCard === i ? "active" : ""}`}
                      title={meal.name}
                      desc={meal.instructions}
                      cardImg={meal.image}
                      onDeleteClick={() => deleteMealFromWeek(activeTab, i)}
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </main>
  );
}
