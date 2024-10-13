import React from "react";
import Image from "next/image";
// import Img1 from "../../../public/meal-1.png";
import Button from "../button";
import { RiDeleteBin6Line } from "react-icons/ri";

type CardProps = {
  onClick?: (...args: any[]) => any;
  // onEditClick?: (...args: any[]) => any;
  onDeleteClick?: (...args: any[]) => any;
  title: string;
  desc: string;
  cardImg: any;
  className: any;
  // body: string;
};

export default function Card(props: CardProps) {
  const { onDeleteClick, onClick, className, cardImg, title, desc } = props;
  return (
    <>
      <div className={className} onClick={onClick}>
        <div className="card-img">
          <Image
            src={cardImg}
            alt="Card Image"
            className="mainImage"
            width={100}
            height={400}
          />

          {onDeleteClick && (
            <div className="Delete">
              <Button label={<RiDeleteBin6Line onClick={onDeleteClick} />} />
            </div>
          )}
          <div className="cardBtn">
            <Button label="Dinner" />
          </div>
        </div>

        <div className="card-content">
          <h3>{title}</h3>

          <p>{desc}</p>

          <div className="card-footer">
            <span>
              <strong>Cuisine:</strong> Italian
            </span>
            <span>
              <strong>Rating:</strong> 4.6
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
