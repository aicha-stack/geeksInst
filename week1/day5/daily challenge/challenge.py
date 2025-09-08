import math
class Circle:
    def __init__(self, radius=None, diameter=None):
        """Un cercle peut être défini par un rayon OU un diamètre"""
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        else:
            raise ValueError("Il faut donner soit un rayon, soit un diamètre.")
    @property
    def diameter(self):
        return self.radius * 2

    @property
    def area(self):
        return math.pi * (self.radius ** 2)
    def __str__(self):
        return f"Circle(radius={self.radius}, diameter={self.diameter}, area={self.area:.2f})"


    def __add__(self, other):
        if isinstance(other, Circle):
            return Circle(radius=self.radius + other.radius)
        return NotImplemented
    def __lt__(self, other):
        return self.radius < other.radius

    def __le__(self, other):
        return self.radius <= other.radius

    def __gt__(self, other):
        return self.radius > other.radius

    def __ge__(self, other):
        return self.radius >= other.radius
    def __eq__(self, other):
        return self.radius == other.radius

    def __ne__(self, other):
        return self.radius != other.radius
if __name__ == "__main__":
    c1 = Circle(radius=5)
    c2 = Circle(diameter=10)
    c3 = Circle(radius=8)

    print(c1)  
    print(c2)  
    print(c3)  
    c4 = c1 + c3
    print("Addition des cercles :", c4)
    print("c1 == c2 ?", c1 == c2)  
    print("c1 < c3 ?", c1 < c3)    
    print("c3 > c2 ?", c3 > c2)    
    circles = [c3, c1, c2, c4]
    circles.sort()
    print("Cercles triés :")
    for c in circles:
        print(c)