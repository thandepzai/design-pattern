# Bài Tập Thực Hành: Visitor Pattern

Hoàn thiện các phần `// TODO` trong file `exercises.ts`.  
Chạy kiểm tra: `npx tsx exercises.ts`

---

## Bài Tập 1: Hệ Thống Tính Thuế Hàng Hóa

### Mô tả

Bạn đang xây dựng hệ thống tính thuế cho một sàn thương mại điện tử. Hệ thống có ba loại hàng hóa với thuế suất khác nhau:

| Loại hàng | Thuế suất |
|-----------|-----------|
| Thực phẩm (`FoodItem`) | 0% |
| Điện tử (`ElectronicsItem`) | 10% |
| Quần áo (`ClothingItem`) | 5% |

Hệ thống cần hỗ trợ hai chính sách tính thuế:
- **StandardTaxVisitor:** Áp dụng thuế suất bình thường theo từng loại hàng.
- **DiscountTaxVisitor:** Áp dụng thuế suất giảm 50% cho mọi loại hàng (chương trình khuyến mãi).

### Yêu cầu

Implement `TaxVisitor` interface với các method:
- `visitFood(item: FoodItem): void`
- `visitElectronics(item: ElectronicsItem): void`
- `visitClothing(item: ClothingItem): void`

Mỗi Item class có `accept(visitor: TaxVisitor): void` sử dụng double dispatch.

Các class Item cần expose `name: string` và `price: number`.

### Gợi ý

```
FoodItem.accept(visitor)      -> visitor.visitFood(this)
ElectronicsItem.accept(visitor) -> visitor.visitElectronics(this)
ClothingItem.accept(visitor)  -> visitor.visitClothing(this)

StandardTaxVisitor.visitElectronics({ name: "Laptop", price: 1000 })
  => tax = 1000 * 10% = 100
  => log: "TAX_STANDARD: Điện tử 'Laptop' giá $1000 - Thuế 10% = $100"

DiscountTaxVisitor.visitElectronics({ name: "Laptop", price: 1000 })
  => tax = 1000 * 5% = 50  (10% giảm 50% còn 5%)
  => log: "TAX_DISCOUNT: Điện tử 'Laptop' giá $1000 - Thuế 5% = $50"
```

---

## Bài Tập 2: Tính Diện Tích và Chu Vi Hình Học

### Mô tả

Bạn đang xây dựng thư viện hình học. Các hình (`Circle`, `Rectangle`, `Triangle`) cần hỗ trợ nhiều loại tính toán khác nhau mà không cần thêm method vào từng class hình.

Sử dụng Visitor Pattern để implement:
- **AreaVisitor:** Tính diện tích từng hình.
- **PerimeterVisitor:** Tính chu vi từng hình.

### Công thức

| Hình | Diện tích | Chu vi |
|------|-----------|--------|
| Hình tròn (`r`) | `π × r²` | `2 × π × r` |
| Hình chữ nhật (`w × h`) | `w × h` | `2 × (w + h)` |
| Tam giác (`a, b, c`) | Công thức Heron | `a + b + c` |

**Công thức Heron** (tam giác với 3 cạnh a, b, c):
```
s = (a + b + c) / 2
area = sqrt(s × (s-a) × (s-b) × (s-c))
```

### Yêu cầu

Implement `ShapeVisitor` interface với:
- `visitCircle(c: Circle): void`
- `visitRectangle(r: Rectangle): void`
- `visitTriangle(t: Triangle): void`

Các class Shape cần expose các thuộc tính cần thiết và implement `accept(visitor: ShapeVisitor): void`.

### Gợi ý

```
Circle(r=5).accept(areaVisitor)
  => area = π × 25 ≈ 78.54
  => log: "AREA: Hình tròn r=5 - Diện tích = 78.54"

Rectangle(4, 6).accept(perimeterVisitor)
  => perimeter = 2 × (4 + 6) = 20
  => log: "PERIMETER: Hình chữ nhật 4x6 - Chu vi = 20"

Triangle(3, 4, 5).accept(areaVisitor)
  => s = 6, area = sqrt(6×3×2×1) = 6.00
  => log: "AREA: Tam giác 3/4/5 - Diện tích = 6.00"
```
