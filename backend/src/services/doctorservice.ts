import pool from "../config/db";
export const getAllDoctors=async()=>{const r=await pool.query("SELECT id,name,specialization FROM doctors ORDER BY id ASC");return r.rows;};
export const getDoctorByIdService=async(id:number)=>{const r=await pool.query("SELECT id,name,specialization FROM doctors WHERE id=$1",[id]);return r.rows[0];};
export const createDoctor=async(name:string,specialization:string)=>{const r=await pool.query("INSERT INTO doctors (name,specialization) VALUES ($1,$2) RETURNING id,name,specialization",[name,specialization]);return r.rows[0];};
export const updateDoctorById=async(id:number,name:string,specialization:string)=>{const r=await pool.query("UPDATE doctors SET name=$1,specialization=$2 WHERE id=$3 RETURNING id,name,specialization",[name,specialization,id]);return r.rows[0];};
export const deleteDoctorById=async(id:number)=>{const r=await pool.query("DELETE FROM doctors WHERE id=$1 RETURNING id",[id]);return r.rows[0];};
