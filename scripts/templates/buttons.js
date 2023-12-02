function toggleDropdown() {
    const FilterButtons = document.querySelectorAll('.filterButton');

    FilterButtons.forEach(function (filterButton) {
        filterButton.addEventListener('click', function () {
            // Get the associated elements for the clicked button
            const chevronDown = filterButton.querySelector('.fa-chevron-down');
            const chevronUp = filterButton.querySelector('.fa-chevron-up');
            const myDropdown = filterButton.nextElementSibling; // Assuming the dropdown is the next sibling element

            // Toggle the display of the dropdown
            myDropdown.style.display = myDropdown.style.display === 'none' ? 'block' : 'none';

            // Toggle the display of chevrons
            chevronDown.style.display = myDropdown.style.display === 'none' ? 'block' : 'none';
            chevronUp.style.display = myDropdown.style.display === 'none' ? 'none' : 'block';
        });
    });
}

// Call the function to set up the event listeners for all filter buttons
toggleDropdown();