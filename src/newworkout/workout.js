class Workout {
  constructor(heartExercise, clubExercise, diamondExercise, spadeExercise) {
    this.heartExercise = heartExercise;
    this.clubExercise = clubExercise;
    this.diamondExercise = diamondExercise;
    this.spadeExercise = spadeExercise;
    this.time;
    this.date = this.getCurrentDate();
  }
  getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${month}/${day}/${year}`;
  }
}

export default Workout;