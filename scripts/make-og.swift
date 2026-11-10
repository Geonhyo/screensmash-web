// 공유 미리보기 이미지(Open Graph, 1200×630)를 만든다. 결과: public/og.png
//
//   swiftc scripts/make-og.swift -o /tmp/make-og && /tmp/make-og <앱 아이콘 1024 PNG> public/og.png
//
// 카카오톡·슬랙·X 등에 링크를 붙였을 때 보이는 그림. 글자는 한국어 시스템 글꼴로 그린다.
import AppKit

let args = CommandLine.arguments
guard args.count >= 3, let icon = NSImage(contentsOfFile: args[1]) else {
    print("사용: make-og <icon_1024.png> <out.png>"); exit(1)
}
let W: CGFloat = 1200, H: CGFloat = 630
let accent = NSColor(srgbRed: 1, green: 106 / 255, blue: 43 / 255, alpha: 1)
let bg = NSColor(srgbRed: 0x0C / 255, green: 0x0D / 255, blue: 0x10 / 255, alpha: 1)
let dim = NSColor(srgbRed: 0xC9 / 255, green: 0xCB / 255, blue: 0xD1 / 255, alpha: 1)

let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: Int(W), pixelsHigh: Int(H), bitsPerSample: 8,
                           samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB,
                           bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState()
let ctx = NSGraphicsContext(bitmapImageRep: rep)!
NSGraphicsContext.current = NSGraphicsContext(cgContext: ctx.cgContext, flipped: true)
let c = ctx.cgContext
c.translateBy(x: 0, y: H)
c.scaleBy(x: 1, y: -1)

bg.setFill()
c.fill(CGRect(x: 0, y: 0, width: W, height: H))

// 오른쪽: 큰 균열(앱 아이콘과 같은 결)
let center = CGPoint(x: 905, y: 330)
let arms: [[CGPoint]] = [
    [center, CGPoint(x: 990, y: 250), CGPoint(x: 1080, y: 205), CGPoint(x: 1200, y: 150)],
    [center, CGPoint(x: 1010, y: 345), CGPoint(x: 1110, y: 375), CGPoint(x: 1200, y: 368)],
    [center, CGPoint(x: 935, y: 430), CGPoint(x: 925, y: 530), CGPoint(x: 950, y: 630)],
    [center, CGPoint(x: 850, y: 420), CGPoint(x: 800, y: 520), CGPoint(x: 770, y: 630)],
    [center, CGPoint(x: 830, y: 300), CGPoint(x: 760, y: 250), CGPoint(x: 700, y: 262)],
    [center, CGPoint(x: 885, y: 220), CGPoint(x: 870, y: 110), CGPoint(x: 845, y: 0)],
    [center, CGPoint(x: 960, y: 200), CGPoint(x: 1010, y: 90), CGPoint(x: 1040, y: 0)],
]
c.setLineCap(.round); c.setLineJoin(.round)
for (color, width) in [(NSColor.black.withAlphaComponent(0.5), CGFloat(7)), (NSColor.white.withAlphaComponent(0.55), CGFloat(2.4))] {
    c.setStrokeColor(color.cgColor); c.setLineWidth(width)
    for a in arms { c.addLines(between: a) }
    c.strokePath()
}
// 앱 아이콘을 균열 가운데에
let iconRect = CGRect(x: center.x - 130, y: center.y - 130, width: 260, height: 260)
// 컨텍스트가 이미 뒤집혀(flipped) 있으므로 respectFlipped로 그린다.
icon.draw(in: iconRect, from: .zero, operation: .sourceOver, fraction: 1, respectFlipped: true, hints: nil)

// 왼쪽: 제목
func draw(_ s: String, _ font: NSFont, _ color: NSColor, at p: CGPoint) {
    NSAttributedString(string: s, attributes: [.font: font, .foregroundColor: color, .kern: -1.2]).draw(at: p)
}
let title = NSFont.systemFont(ofSize: 76, weight: .black)
draw("지금 보고 있는", title, .white, at: CGPoint(x: 80, y: 120))
draw("그 화면을,", title, .white, at: CGPoint(x: 80, y: 212))
draw("부수세요.", title, accent, at: CGPoint(x: 80, y: 304))
draw("Screen Smash · Mac용 무료 게임", .systemFont(ofSize: 30, weight: .semibold), dim, at: CGPoint(x: 82, y: 452))
draw("macOS 14 이상 · Apple Silicon · Intel", .systemFont(ofSize: 24, weight: .regular), dim.withAlphaComponent(0.75), at: CGPoint(x: 82, y: 500))

NSGraphicsContext.restoreGraphicsState()
try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: args[2]))
print("wrote", args[2])
