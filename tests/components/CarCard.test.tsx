// import { render, screen } from '@testing-library/react';
// import CarCard from '@/components/CarCard';

// const mockCar = {
//   id: '1',
//   make: 'Toyota',
//   model: 'Camry',
//   year: 2022,
//   price: 25000,
//   description: 'A reliable sedan',
//   specifications: {
//     Engine: '2.5L 4-cylinder',
//     Transmission: '8-speed automatic',
//     'Fuel Economy': '28/39 mpg city/hwy'
//   },
//   images: ['/camry.jpg']
// };

// describe('CarCard', () => {
//   it('renders car information correctly', () => {
//     render(<CarCard car={mockCar} />);
    
//     expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
//     expect(screen.getByText('Year: 2022')).toBeInTheDocument();
//     expect(screen.getByText('$25,000')).toBeInTheDocument();
//   });

//   it('links to the correct car details page', () => {
//     render(<CarCard car={mockCar} />);
//     const link = screen.getByRole('link');
//     expect(link).toHaveAttribute('href', '/cars/1');
//   });
// });