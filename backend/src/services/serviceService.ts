import pool from "../config/db";
export const getAllServices=async()=>{const r=await pool.query("SELECT id,title,description FROM services ORDER BY id ASC");return r.rows;};
export const getServiceByIdService=async(id:number)=>{const r=await pool.query("SELECT id,title,description FROM services WHERE id=$1",[id]);return r.rows[0];};
export const createService=async(title:string,description:string)=>{const r=await pool.query("INSERT INTO services (title,description) VALUES ($1,$2) RETURNING id,title,description",[title,description]);return r.rows[0];};
export const updateServiceById=async(id:number,title:string,description:string)=>{const r=await pool.query("UPDATE services SET title=$1,description=$2 WHERE id=$3 RETURNING id,title,description",[title,description,id]);return r.rows[0];};
export const deleteServiceById=async(id:number)=>{const r=await pool.query("DELETE FROM services WHERE id=$1 RETURNING id",[id]);return r.rows[0];};
