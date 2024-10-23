document.getElementById('fftForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get input numbers
    const inputText = document.getElementById('numbersInput').value;
    const numbers = inputText.split(',').map(num => parseFloat(num.trim()));

    // Perform FFT
    const fftResult = fft(numbers);

    // Display FFT result
    const resultDiv = document.getElementById('fftResult');
    resultDiv.innerHTML = fftResult.map((c, i) => 
        `Index ${i}: ${c.real.toFixed(2)} + ${c.imag.toFixed(2)}j`
    ).join('<br>');
});

// Function to perform FFT (Cooley-Tukey Algorithm)
function fft(input) {
    const n = input.length;
    if (n <= 1) return input.map(x => ({ real: x, imag: 0 }));

    // DFT on even and odd indices
    const even = fft(input.filter((_, i) => i % 2 === 0));
    const odd = fft(input.filter((_, i) => i % 2 !== 0));

    const result = Array(n).fill(null).map(() => ({ real: 0, imag: 0 }));

    for (let k = 0; k < n / 2; k++) {
        const exp = -2 * Math.PI * k / n;
        const cosExp = Math.cos(exp);
        const sinExp = Math.sin(exp);
        const t = {
            real: cosExp * odd[k].real - sinExp * odd[k].imag,
            imag: cosExp * odd[k].imag + sinExp * odd[k].real
        };
        result[k] = {
            real: even[k].real + t.real,
            imag: even[k].imag + t.imag
        };
        result[k + n / 2] = {
            real: even[k].real - t.real,
            imag: even[k].imag - t.imag
        };
    }
    return result;
}
