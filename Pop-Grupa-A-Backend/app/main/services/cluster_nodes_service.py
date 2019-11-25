import app.main.repositories.cluster_nodes_repository as nodes_repository
import app.main.repositories.machines_repository as machine_repository

def get_nodes_for_user(userId):
    #TODO below is to be fixed 
    return nodes_repository.get_cluster_noddes_for_user(userId)