function pointInsideRect(point, rect) {
    return point.x > rect[0] && point.x < rect[0] + rect[2] && point.y > rect[1] && point.y < rect[1] + rect[3]
}

class VectorOP {
    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y)
    }

    static sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y)
    }

    static norm(v) {
        return Math.sqrt(v.x ** 2 + v.y ** 2)
    }

    static normalize(v) {
        let n = this.norm(v)
        return new Vector(v.x / n, v.y / n)
    }
}