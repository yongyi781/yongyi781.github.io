---
title: "Adventitious triangles"
description: "A fun excursion on variants of the classic 20-80-80 triangle geometry problem"
pubDate: "6/5/2024"
tags: math, geometry, fun
---

The classic 20-80-80 triangle geometry problem looks like this.
![Triangle problem 3](/images/triangles/9_1_3_4.svg)
We have an isosceles right triangle $\triangle ABC$ with angles 20°, 80°, and 80°, and lines $AE$ and $BD$ with angles as shown. The task is to find the red marked angle at $E$.

This is a well known problem, and you might have even seen it shared on social media at some point. You can find the solution on this [Wikipedia page](https://en.wikipedia.org/wiki/Langley%27s_Adventitious_Angles).

Here's the fun part no one told you:
* If you try to generalize the problem with general integral angles (or rational angles) in place of the ones in the image, the red angle will **not** in general be integral or rational.
* Nevertheless, there are infinitely many triangles where the 5 labeled angles, along with the unknown angle, are rational. We'll call these **rational adventitious triangles**.

From what I can tell, it appears that the rational adventitious triangles come in two families:
* One infinite family whose defining feature is that you can construct a right angle out of the segments or vertically mirrored images of the segments. The triangle at the top of this page is a member of this infinite family, because the vertical mirror of line $AE$ is perpendicular to line $DE$.
* And a finite family of sporadic triangles where there are no right angles involved.

For fun, I enumerated the latter and they're all shown below.

I'm curious if one can find natural synthetic geometry proofs for each one, similar to the famous solution to the first triangle of this post. Show these problems to your friends and family. If you find any synthetic arguments, let me know!

![Triangle problem 1](/images/triangles/9_1_2_3.svg)
![Triangle problem 2](/images/triangles/9_1_2_4.svg)
![Triangle problem 4](/images/triangles/12_3_6_7.svg)
![Triangle problem 5](/images/triangles/12_3_6_10.svg)
![Triangle problem 6](/images/triangles/15_1_3_4.svg)
![Triangle problem 7](/images/triangles/15_1_3_8.svg)
![Triangle problem 8](/images/triangles/15_1_4_6.svg)
![Triangle problem 9](/images/triangles/15_1_4_8.svg)
![Triangle problem 10](/images/triangles/15_1_8_10.svg)
![Triangle problem 11](/images/triangles/15_1_8_12.svg)
![Triangle problem 12](/images/triangles/15_6_8_11.svg)
![Triangle problem 13](/images/triangles/15_10_11_12.svg)
![Triangle problem 14](/images/triangles/15_10_11_13.svg)
![Triangle problem 15](/images/triangles/21_1_8_10.svg)
![Triangle problem 16](/images/triangles/21_6_13_16.svg)
![Triangle problem 17](/images/triangles/21_6_13_17.svg)
![Triangle problem 18](/images/triangles/30_12_17_21.svg)
![Triangle problem 19](/images/triangles/30_12_17_23.svg)

Here is the C++ code I wrote to produce these triangles. Each line in the output is of the form $(g,a,b,c,\pm d)$ and corresponds to the triangle where $\angle ACB=\frac a{2g}\cdot\frac{\pi}2$, line $AE$ is inclined at angle $\frac bg\cdot\frac{\pi}2$ with respect to the vertical, line $BD$ is inclined at angle $\frac cg\cdot\frac{\pi}2$ with respect to the vertical, and line $DE$ is inclined at angle $\frac dg\cdot\frac{\pi}2$ with respect to the vertical.
```cpp
#include <cmath>
#include <fstream>
#include <iostream>
#include <numeric>

using namespace std;

// https://www.geogebra.org/calculator/fgbhynue
int main()
{
    ofstream fout("test_langley_out.txt");
    for (int denom = 4; denom <= 180; ++denom)
    {
        fout << "# denom = " << denom << "\n";
        for (int a = 1; a < denom; ++a)
        {
            for (int b = a + 1; b < denom; ++b)
            {
                for (int c = a + 1; c < denom; ++c)
                {
                    if (b == c || gcd(gcd(a, b), c) != 1)
                        continue;
                    auto aa = numbers::pi / 2 * a / denom;
                    auto bb = numbers::pi / 2 * b / denom;
                    auto cc = numbers::pi / 2 * c / denom;
                    auto x = 1 / tan(aa);
                    auto y = 1 / tan(bb);
                    auto z = 1 / tan(cc);
                    auto result = atan((x * x - y * z) / (x * x * (y - z)));
                    auto df = result * denom / (numbers::pi / 2);
                    auto d = (int)round(df);
                    if (abs(df - d) < 1e-9 && b + c != denom && b + abs(d) != denom && c + abs(d) != denom)
                        fout << denom << " " << a << " " << b << " " << c << " " << d << "\n";
                }
            }
        }
    }
}
```
