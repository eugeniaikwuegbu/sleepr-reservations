describe('Health', () => {
  test('Reservations', async () => {
    const response = await fetch('http://reservations:3000');

    console.log('resp===', response);

    expect(response.ok).toBeTruthy();
  });
});
