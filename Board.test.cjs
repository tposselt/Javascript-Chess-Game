const Board = require('./Board.js');
const pieces = Board.pieces;

test("Require base chess' white pieces to set up properly", () => {
    Board.resetPiecePositions(pieces, 'base');
    const whitePieces = pieces.slice(0, 7);
    for (let i = 0; i < whitePieces.length; i++)
    {
        expect(whitePieces[i].position).toBe(11 + i);
    }
});

test("Require base chess pieces to mirror", () => {
    Board.resetPiecePositions(pieces, 'base');
    const whitePieces = pieces.slice(0, 7);
    const blackPieces = pieces.slice(16, 23);
    for (let i = 0; i < whitePieces.length; i++)
    {
        expect(blackPieces[i].position).toBe(whitePieces[i].position + 70);
    }
});

test("Require chess960 pieces to mirror", () => {
    Board.resetPiecePositions(pieces, '960');
    const whitePieces = pieces.slice(0, 8);
    const blackPieces = pieces.slice(16, 24);
    for (let i = 0; i < whitePieces.length; i++)
    {
        expect(blackPieces[i].position).toBe(whitePieces[i].position + 70);
    }
});

test("Require chess960 king to be between two rooks", () => {
    Board.resetPiecePositions(pieces, '960');
    const whitePieces = pieces.slice(0, 8);
    const kingPos = whitePieces.filter((piece) => piece.rank === 'king')[0].position;
    const rooks = whitePieces.filter((piece) => piece.rank === 'rook');

    expect(rooks[0].position < kingPos).toBe(true);
    expect(rooks[1].position > kingPos).toBe(true);
});

test("Require chess960 bishops to be on different colors", () => {
    Board.resetPiecePositions(pieces, '960');
    const whitePieces = pieces.slice(0, 8);
    const bishops = whitePieces.filter((piece) => piece.rank === 'bishop');

    expect(bishops[0].position %2 != bishops[1].position %2).toBe(true);
});

// this has a 1/960 chance of failing if it works properly, it's just here as a demonstration
test("Require chess960 white pieces to not match base chess", () => {
    Board.resetPiecePositions(pieces, '960');
    const whitePieces = pieces.slice(0, 7);

    let matchesBaseChess = true;
    for (let i = 0; i < whitePieces.length; i++)
    {
        if (whitePieces[i].position !== 11 + i)
        {
            matchesBaseChess = false;
            break;
        }
    }

    expect(matchesBaseChess).toBe(false);
});