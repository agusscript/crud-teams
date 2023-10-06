class Team {
  constructor(
    id,
    name,
    shortName,
    initials,
    image,
    country,
    founded,
    address,
    stadium,
    colors,
    website,
    phone,
    email
  ) {
    this.id = id;
    this.name = name;
    this.shortName = shortName;
    this.initials = initials;
    this.image = image;
    this.country = country;
    this.founded = founded;
    this.address = address;
    this.stadium = stadium;
    this.colors = colors;
    this.website = website;
    this.phone = phone;
    this.email = email;
  }
}

module.exports = Team;
