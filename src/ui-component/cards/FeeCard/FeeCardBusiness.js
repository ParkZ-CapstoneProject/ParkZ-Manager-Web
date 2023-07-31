import React from "react";
import "./FeeCardBusiness.scss";

const FeeCardBusiness = () => {
  return (
    <>
      <section className="product-container product-1">
        <div className="card">
          <div className="photo"></div>
          <div className="content">
            <div className="title">Cước phí mặc định</div>
            <div className="bg-title">Phí</div>
            <div className="feature size">
              <div>Doanh nghiệp:</div>
              <span>90,000đ/thang</span>
            </div>
            <div className="feature color">
              <div>tư nhân:</div>
              <span>10,000đ/thang</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeeCardBusiness;
