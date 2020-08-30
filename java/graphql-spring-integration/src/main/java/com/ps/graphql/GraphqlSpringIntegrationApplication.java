package com.ps.graphql;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;

import lombok.Data;
import lombok.EqualsAndHashCode;

@SpringBootApplication
public class GraphqlSpringIntegrationApplication {

	public static void main(String[] args) {
		SpringApplication.run(GraphqlSpringIntegrationApplication.class, args);
	}

}

@Component
class VehicleMutation implements GraphQLMutationResolver {
	@Autowired
	private VehicleService vehicleService;

	public Vehicle createVehicle(final String type, final String modelCode, final String brandName,
			final String launchDate) {
		return this.vehicleService.createVehicle(type, modelCode, brandName, launchDate);
	}
}

@Component
class VehicleQuery implements GraphQLQueryResolver {
	@Autowired
	private VehicleService vehicleService;

	public List<Vehicle> getVehicles(final int count) {
		return this.vehicleService.getAllVehicles(count);
	}

	public Optional<Vehicle> getVehicle(final int id) {
		return this.vehicleService.getVehicle(id);
	}
}

@Service
class VehicleService {
	private final VehicleRepository vehicleRepository;

	public VehicleService(final VehicleRepository vehicleRepository) {
		this.vehicleRepository = vehicleRepository;
	}

	@Transactional
	public Vehicle createVehicle(final String type, final String modelCode, final String brandName,
			final String launchDate) {
		final Vehicle vehicle = new Vehicle();
		vehicle.setType(type);
		vehicle.setModelCode(modelCode);
		vehicle.setBrandName(brandName);
		vehicle.setLaunchDate(LocalDate.parse(launchDate));
		return this.vehicleRepository.save(vehicle);
	}

	@org.springframework.transaction.annotation.Transactional(readOnly = true)
	public List<Vehicle> getAllVehicles(final int count) {
		return this.vehicleRepository.findAll().stream().limit(count).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public Optional<Vehicle> getVehicle(final int id) {
		return this.vehicleRepository.findById(id);
	}
}

@Repository
interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
}

@Data
@EqualsAndHashCode
@Entity
class Vehicle implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name = "ID", nullable = false)
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@Column(name = "type", nullable = false)
	private String type;
	@Column(name = "model_code", nullable = false)
	private String modelCode;
	@Column(name = "brand_name")
	private String brandName;
	@Column(name = "launch_date")
	private LocalDate launchDate;
	private transient String formattedDate;

	// Getter and setter
	public String getFormattedDate() {
		return getLaunchDate().toString();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getModelCode() {
		return modelCode;
	}

	public void setModelCode(String modelCode) {
		this.modelCode = modelCode;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public LocalDate getLaunchDate() {
		return launchDate;
	}

	public void setLaunchDate(LocalDate launchDate) {
		this.launchDate = launchDate;
	}

	public void setFormattedDate(String formattedDate) {
		this.formattedDate = formattedDate;
	}
}