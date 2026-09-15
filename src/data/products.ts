export const productSpecifications = [
  {
    id: "native-starch",
    tab: { vi: "Tinh bột tự nhiên", en: "Native starch", zh: "原淀粉" },
    badge: "BINH MINH · NATIVE STARCH",
    title: {
      vi: "Native Tapioca Starch — Thông số tham khảo Bình Minh",
      en: "Native Tapioca Starch — Binh Minh reference specifications",
      zh: "原生木薯淀粉 — Binh Minh 参考参数"
    },
    description: {
      vi: "Thông tin kỹ thuật cô đọng để khách hàng và đối tác dễ đối chiếu. Thông số thương mại cuối cùng được xác nhận theo COA, lô hàng và mục đích sử dụng.",
      en: "A concise technical reference for customers and partners. Final commercial specifications depend on the COA, production lot and intended use.",
      zh: "为客户与合作伙伴提供简明的技术参考。最终商业参数以 COA、生产批次及具体用途为准。"
    },
    specs: [
      { label: { vi: "Độ ẩm", en: "Moisture", zh: "水分" }, unit: "%", value: "≤ 13" },
      { label: { vi: "pH", en: "pH", zh: "pH" }, unit: "—", value: "6.4 – 7.0" },
      { label: { vi: "Độ trắng", en: "Whiteness", zh: "白度" }, unit: "%", value: "> 90" },
      { label: { vi: "Hàm lượng tinh bột", en: "Starch content", zh: "淀粉含量" }, unit: "%", value: "≥ 85" },
      { label: { vi: "Độ keo / độ nhớt", en: "Gel viscosity", zh: "胶体黏度" }, unit: "BU", value: { vi: "Theo COA", en: "Per COA", zh: "以 COA 为准" } },
      { label: { vi: "Độ tro", en: "Ash", zh: "灰分" }, unit: "%", value: "≤ 0.1" }
    ],
    characteristics: [
      { icon: "star", title: { vi: "Ngoại quan", en: "Appearance", zh: "外观" }, text: { vi: "Bột mịn, tơi, màu trắng đến trắng kem nhạt.", en: "Fine, free-flowing powder; white to light cream.", zh: "粉末细腻、流动性好，颜色白至浅奶油色。" } },
      { icon: "shield", title: { vi: "Mùi và vị", en: "Taste and odour", zh: "气味与口感" }, text: { vi: "Vị trung tính, không có mùi lạ hay tạp mùi bất thường.", en: "Neutral taste, with no foreign or abnormal odour.", zh: "味道中性，无异味或异常气味。" } },
      { icon: "bag", title: { vi: "Đóng gói", en: "Packaging", zh: "包装" }, text: { vi: "Bao 10 kg, 25 kg, 50 kg và bao jumbo theo đơn hàng.", en: "10 kg, 25 kg, 50 kg and jumbo bags, subject to order.", zh: "10 公斤、25 公斤、50 公斤及吨袋包装，具体按订单约定。" } },
      { icon: "factory", title: { vi: "Ứng dụng", en: "Applications", zh: "应用" }, text: { vi: "Thực phẩm Gluten Free và nhiều ứng dụng công nghiệp, tùy cấp chất lượng và COA.", en: "Gluten-free foods and industrial applications, subject to grade and COA.", zh: "适用于无麸质食品及多种工业用途，具体以等级和 COA 为准。" } }
    ],
    footnote: {
      vi: "Dữ liệu tham khảo/draft. Yêu cầu về kim loại nặng, vi sinh và độ nhớt cần được xác nhận riêng theo COA.",
      en: "Reference/draft data. Heavy metals, microbiology and viscosity must be confirmed separately in the COA.",
      zh: "参考/草案数据。重金属、微生物及黏度指标须在 COA 中另行确认。"
    }
  },
  {
    id: "modified-starch",
    tab: { vi: "Tinh bột biến tính", en: "Modified starch", zh: "变性淀粉" },
    badge: "BINH MINH · MODIFIED STARCH",
    title: {
      vi: "Modified Tapioca Starch — Thông số tham khảo",
      en: "Modified Tapioca Starch — Reference specifications",
      zh: "变性木薯淀粉 — 参考参数"
    },
    description: {
      vi: "Tinh bột mì được điều chỉnh tính năng cho từng ứng dụng. Chỉ tiêu cuối cùng phụ thuộc loại biến tính, mã sản phẩm và COA.",
      en: "Tapioca starch with functional properties tailored to each application. Final specifications depend on the modification, product code and COA.",
      zh: "根据不同应用调整功能特性的木薯淀粉。最终参数取决于变性类型、产品编号及 COA。"
    },
    specs: [
      { label: { vi: "Độ ẩm", en: "Moisture", zh: "水分" }, unit: "%", value: "≤ 14*" },
      { label: { vi: "pH", en: "pH", zh: "pH" }, unit: "—", value: "2.5 – 7.5*" },
      { label: { vi: "Ngoại quan", en: "Appearance", zh: "外观" }, unit: "—", value: { vi: "Trắng / trắng ngà", en: "White / off-white", zh: "白色 / 类白色" } },
      { label: { vi: "Hàm lượng tinh bột", en: "Starch content", zh: "淀粉含量" }, unit: "%", value: { vi: "Theo COA", en: "Per COA", zh: "以 COA 为准" } },
      { label: { vi: "Độ keo / độ nhớt", en: "Gel viscosity", zh: "胶体黏度" }, unit: "BU / mPa·s", value: { vi: "Theo ứng dụng", en: "Application-specific", zh: "按应用确定" } },
      { label: { vi: "Độ tro", en: "Ash", zh: "灰分" }, unit: "%", value: { vi: "Theo COA", en: "Per COA", zh: "以 COA 为准" } }
    ],
    characteristics: [
      { icon: "star", title: { vi: "Ngoại quan", en: "Appearance", zh: "外观" }, text: { vi: "Bột trắng đến trắng ngà; dạng hạt hoặc tiền hồ hóa tùy sản phẩm.", en: "White to off-white powder; granular or pregelatinised, depending on grade.", zh: "白色至类白色粉末；可为颗粒状或预糊化型，视产品等级而定。" } },
      { icon: "shield", title: { vi: "Tính năng", en: "Functionality", zh: "功能" }, text: { vi: "Tạo đặc, ổn định, kết dính hoặc nhũ hóa theo loại biến tính.", en: "Thickening, stabilising, binding or emulsifying, depending on modification.", zh: "根据变性类型提供增稠、稳定、黏结或乳化功能。" } },
      { icon: "bag", title: { vi: "Đóng gói", en: "Packaging", zh: "包装" }, text: { vi: "Quy cách theo mã sản phẩm và đơn hàng.", en: "Packaging depends on product code and order.", zh: "包装规格按产品编号及订单约定。" } },
      { icon: "factory", title: { vi: "Ứng dụng", en: "Applications", zh: "应用" }, text: { vi: "Sốt, mì sợi, thực phẩm chế biến và công thức Gluten Free sau khi xác minh toàn bộ thành phần.", en: "Sauces, noodles, processed foods and gluten-free formulations after all ingredients are verified.", zh: "适用于酱料、面制品、加工食品及经全部配料核实后的无麸质配方。" } }
    ],
    footnote: {
      vi: "* Khoảng pH mang tính tổng quát giữa nhiều loại biến tính, không phải tiêu chuẩn cho một mã hàng cụ thể.",
      en: "* The pH range spans multiple modification types and does not define any single commercial grade.",
      zh: "* pH 范围涵盖多种变性类型，并非任何单一商业等级的最终标准。"
    }
  },
  {
    id: "maltose-syrup",
    tab: { vi: "Mạch nha Maltose", en: "Maltose syrup", zh: "麦芽糖浆" },
    badge: "BINH MINH · MALTOSE SYRUP",
    title: {
      vi: "Mạch nha Maltose từ tinh bột mì — Thông số tham khảo",
      en: "Cassava-based Maltose Syrup — Reference specifications",
      zh: "木薯基麦芽糖浆 — 参考参数"
    },
    description: {
      vi: "Siro đường thu được từ quá trình thủy phân tinh bột mì. Cấp sản phẩm được xác định theo hàm lượng maltose, DE và yêu cầu ứng dụng.",
      en: "A starch syrup produced by hydrolysing tapioca starch. Product grade depends on maltose content, DE and end-use requirements.",
      zh: "由木薯淀粉水解制得的淀粉糖浆。产品等级取决于麦芽糖含量、DE 值及最终用途要求。"
    },
    specs: [
      { label: { vi: "Chất khô", en: "Total solids", zh: "总固形物" }, unit: "%", value: "≥ 70*" },
      { label: { vi: "Đương lượng dextrose", en: "Dextrose equivalent", zh: "葡萄糖当量" }, unit: "%", value: "≥ 20*" },
      { label: { vi: "pH", en: "pH", zh: "pH" }, unit: "—", value: { vi: "Theo COA", en: "Per COA", zh: "以 COA 为准" } },
      { label: { vi: "Hàm lượng maltose", en: "Maltose content", zh: "麦芽糖含量" }, unit: { vi: "% chất khô", en: "% dry basis", zh: "%（干基）" }, value: { vi: "Theo cấp hàng", en: "Grade-specific", zh: "按产品等级" } },
      { label: { vi: "Độ Brix", en: "Brix", zh: "白利度" }, unit: "°Bx", value: { vi: "Theo COA", en: "Per COA", zh: "以 COA 为准" } },
      { label: { vi: "Độ tro", en: "Ash", zh: "灰分" }, unit: "%", value: { vi: "Theo COA", en: "Per COA", zh: "以 COA 为准" } }
    ],
    characteristics: [
      { icon: "star", title: { vi: "Ngoại quan", en: "Appearance", zh: "外观" }, text: { vi: "Siro sánh, trong đến vàng nhạt tùy cấp sản phẩm.", en: "Clear to pale-amber viscous syrup, depending on grade.", zh: "透明至浅琥珀色黏稠糖浆，颜色取决于产品等级。" } },
      { icon: "shield", title: { vi: "Mùi và vị", en: "Taste and odour", zh: "气味与口感" }, text: { vi: "Vị ngọt dịu, không có mùi lạ.", en: "Mild sweetness, with no foreign odour.", zh: "甜味柔和，无异味。" } },
      { icon: "bag", title: { vi: "Đóng gói", en: "Packaging", zh: "包装" }, text: { vi: "Phuy, IBC hoặc bồn theo hợp đồng.", en: "Drums, IBCs or bulk tanks, subject to contract.", zh: "桶装、IBC 或槽罐运输，具体按合同约定。" } },
      { icon: "factory", title: { vi: "Ứng dụng", en: "Applications", zh: "应用" }, text: { vi: "Bánh kẹo, đồ uống, sản phẩm nướng và chế biến thực phẩm.", en: "Confectionery, beverages, bakery products and food processing.", zh: "适用于糖果、饮料、烘焙产品及食品加工。" } }
    ],
    footnote: {
      vi: "* Mức chất khô và DE theo định nghĩa nền của Codex cho glucose syrup; hàm lượng maltose cuối cùng phải xác nhận theo COA.",
      en: "* Total solids and DE follow the Codex baseline for glucose syrup; final maltose content must be confirmed in the COA.",
      zh: "* 总固形物和 DE 值采用 Codex 对葡萄糖浆的基础定义；最终麦芽糖含量须以 COA 为准。"
    }
  },
  {
    id: "cassava-pulp",
    tab: { vi: "Bã mì", en: "Cassava pulp", zh: "木薯渣" },
    badge: "BINH MINH · CASSAVA PULP",
    title: {
      vi: "Bã mì — Sản phẩm phụ từ củ mì",
      en: "Cassava Pulp — Cassava-root side product",
      zh: "木薯渣 — 木薯根加工副产品"
    },
    description: {
      vi: "Sản phẩm phụ sau tách tinh bột từ củ mì. Thành phần biến động theo nguyên liệu, hiệu suất tách và trạng thái tươi hoặc sấy.",
      en: "A side product of starch extraction from cassava roots. Composition varies with raw material, extraction efficiency and whether the pulp is fresh or dried.",
      zh: "木薯根提取淀粉后的副产品。其组成会随原料、提取效率以及鲜湿或干燥状态而变化。"
    },
    specs: [
      { label: { vi: "Độ ẩm bã tươi", en: "Fresh-pulp moisture", zh: "鲜渣水分" }, unit: "%", value: "≈ 77 – 84*" },
      { label: { vi: "pH", en: "pH", zh: "pH" }, unit: "—", value: { vi: "Theo lô", en: "By lot", zh: "按批次" } },
      { label: { vi: "Ngoại quan", en: "Appearance", zh: "外观" }, unit: "—", value: { vi: "Xơ ẩm, màu kem", en: "Moist, cream-coloured fibre", zh: "湿润、奶油色纤维状" } },
      { label: { vi: "Tinh bột còn lại", en: "Residual starch", zh: "残余淀粉" }, unit: { vi: "% chất khô", en: "% dry basis", zh: "%（干基）" }, value: { vi: "Theo lô", en: "By lot", zh: "按批次" } },
      { label: { vi: "Xơ thô", en: "Crude fibre", zh: "粗纤维" }, unit: { vi: "% chất khô", en: "% dry basis", zh: "%（干基）" }, value: { vi: "Theo lô", en: "By lot", zh: "按批次" } },
      { label: { vi: "Độ tro", en: "Ash", zh: "灰分" }, unit: { vi: "% chất khô", en: "% dry basis", zh: "%（干基）" }, value: { vi: "Theo lô", en: "By lot", zh: "按批次" } }
    ],
    characteristics: [
      { icon: "star", title: { vi: "Nguồn gốc", en: "Origin", zh: "来源" }, text: { vi: "Thu hồi trực tiếp sau công đoạn tách tinh bột.", en: "Recovered directly after starch extraction.", zh: "在淀粉提取后直接回收。" } },
      { icon: "shield", title: { vi: "Tính biến động", en: "Variability", zh: "波动性" }, text: { vi: "Độ ẩm và tinh bột còn lại thay đổi theo từng lô.", en: "Moisture and residual starch vary by production lot.", zh: "水分与残余淀粉会随生产批次而变化。" } },
      { icon: "bag", title: { vi: "Giao nhận", en: "Handling", zh: "交付方式" }, text: { vi: "Bã tươi hoặc bã sấy; quy cách theo thỏa thuận.", en: "Fresh or dried pulp; handling method subject to agreement.", zh: "可提供鲜渣或干渣；交付方式按协议约定。" } },
      { icon: "factory", title: { vi: "Ứng dụng", en: "Applications", zh: "应用" }, text: { vi: "Nguyên liệu thức ăn chăn nuôi, biogas hoặc compost sau xử lý phù hợp.", en: "Feed material, biogas or compost after suitable processing.", zh: "经适当处理后，可用于饲料原料、沼气或堆肥。" } }
    ],
    footnote: {
      vi: "* Khoảng ẩm suy ra từ tài liệu về bã mì tươi. Mọi chỉ tiêu giao dịch phải lấy mẫu và xác nhận theo từng lô.",
      en: "* The moisture range is derived from published fresh-pulp data. All commercial parameters require lot-specific sampling and confirmation.",
      zh: "* 水分范围源自公开的鲜木薯渣数据。所有商业指标均须按批次取样确认。"
    }
  }
] as const;
