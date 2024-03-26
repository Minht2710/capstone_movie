import { http } from "./config";

export const quanLyRapServ = {
  getAllThongTinCumRap() {
    return http.get("/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01");
  },
};
