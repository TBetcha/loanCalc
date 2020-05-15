/** @format */
//listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

//calc results
function calculateResults(e) {
	console.log('Calculating...');

	//UI vars
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const monthlyPayment = document.getElementById('monthly-payment');
	const years = document.getElementById('years');
	const totalPayment = document.getElementById('total-payment');
	const totalInterest = document.getElementById('total-interest');

	//amount only points to input we need value
	const principal = parseFloat(amount.value);
	//need value div by 100 and 12 to get monthly percent
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	// muly by 12 to get for the year
	const calculatedPayments = parseFloat(years.value) * 12;

	//compute monthly payments
	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = (principal * x * calculatedInterest) / (x - 1);

	if (isFinite(monthly)) {
		// .value inserts into the monthly payment field - toFixed controls decimal places
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
	} else {
		//if not finite somehting went wrong
		showError('Please check your numbers');
	}

	//since its a form we want to do this
	e.preventDefault();
}

//show error
function showError(error) {
	//create a div
	const errorDiv = document.createElement('div');

	//get elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	//add class
	errorDiv.className = 'alert alert-danger';

	//create text node and append to div
	errorDiv.appendChild(document.createTextNode(error));

	//insert error above heading
	card.insertBefore(errorDiv, heading);

	//clear error after 3 seconds
	setTimeout(clearError, 3000);
}

//clear error
function clearError() {
	document.querySelector('.alert').remove();
}
