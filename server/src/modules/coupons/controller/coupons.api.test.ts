import request from "supertest";
import app from "@/app";

describe("GET /coupons (쿠폰 목록 조회)", () => {
  it("쿠폰 목록을 200으로 조회한다", async () => {
    const res = await request(app).get("/coupons");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("쿠폰 목록을 정상적으로 조회하였습니다.");
    expect(Array.isArray(res.body.data.couponList)).toBe(true);
  });

  it("각 쿠폰은 couponId, couponName, isDisabled, couponExpiration을 포함한다", async () => {
    const res = await request(app).get("/coupons");

    expect(res.body.data.couponList[0]).toEqual(
      expect.objectContaining({
        couponId: expect.any(String),
        couponName: expect.any(String),
        // couponDB에는 없지만 BE에서 계산해 내려주는 값
        isDisabled: expect.any(Boolean),
        couponExpiration: expect.any(Number),
      }),
    );
  });
});
