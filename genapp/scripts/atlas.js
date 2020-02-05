var Atlas = function()  {

  function getList {
    return [
      'Wall',
      'Gold',
      'Silver',
      'Bronze',
      'Iron',
      'Copper',
      'TNT',
      'Grass']
  };

  // Atlas Module
  return {
    // Public Members
    name: "Wall", // CSS string
    // Public Methods
    getList: getList
  };
}
