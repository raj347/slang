# slang

Slang is a javascript library used to get the natural representation of a program from theoretical `L` (or `S`) language, from [Martin Davis' Computability, Complexity and Languages](https://www.amazon.com/Computability-Complexity-Languages-Second-Fundamentals/dp/0122063821).

## Example
A valid example of the `S` language is as follows
```
[A1] X1++;
     X1--;
     X1?A1;
```
To get the encoding for said program, store it into a variable and pass it to `program = Program.fromString(programString)`. Then, just call `program.getCode()` to obtain what you were looking for: `"2^703 3^22 5^1534 - 1"`.

For further understanding, keep reading the theory.

## Instructions
To encode an instruction we use a (bijective) pairing function (Mapping from N^2 --> N) with the form `<x,y> = 2^x(2y+1)-1`.
We divide the syntax in 3 disjoint groups and generate the code for an instruction using `<a,<b,c>>`.

### Labels (encoded as `a`)
Starting in 0, the labels are `[A1, B1, C1, D1, E1, A2, ...]`. They are optional in a given line.

### Operations (encoded as `b`)
Starting in 0, the possible operations inside the `S` languague are
- `V` Does nothing
- `V++` Increments the variable V in 1
- `V--` Decrements the variable V in 1
- `V?#L` If V is not zero, go to label L

### Variables (encoded as `c`)
Starting in 0, tha variables are `Y, X1, Z1, X2, Z2, X3, Z3, ...`. Being `Y` the outuput variable. the `X`s the input variables and the `Z`s the auxiliary variables.

## Program encoding
We encode programs using [Gödel numbering](https://en.wikipedia.org/wiki/G%C3%B6del_numbering). So a program is finally encoded as `[#I1, #I2, #I3, ...] - 1` being `#Ij` the code for the `jth` instruction, and `[]` the syntax using for the given Gödel number.

## Documentation
**Program Class**: Represents the program by holding an array of Instructions
```
fromString: returns a Program from a valid S language program string.
getCode: returns the code for the Given program
```
**Instruction Class**: Represents an instruction, with its encoding representation.
```
fromString: returns an Instruction from a valid S language instruction string.
fromCode: returns an Instruction from a valid instruction code.
getCode: returns the code for an Instruction
```
## Notes
Every encoding step can be proved, showing that exists a bijectivity between natural numbers and the `S` language programs. Further proving, that there are functions which can not be computed.