import React from "react";
import "./FeeCardPerson.scss";

const FeeCardPerson = () => {
  return (
    <>
      <section className="product-container-person product-2">
        <div className="card-person">
          <div className="photo"></div>
          <div className="content">
            <div className="title">Cước phí tư nhân</div>
            <div className="bg-title">Phí</div>
            <div className="feature size">
              <div>Giá:</div>
              <span>100,000đ/tháng</span>
            </div>
            <div className="feature color">
              <div>số bãi:</div>
              <span>Một bãi</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeeCardPerson;
