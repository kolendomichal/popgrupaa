import app.main.repositories.cluster_nodes_repository as nodes_repository
import app.main.repositories.machines_repository as machine_repository

def get_nodes_for_user(userId):
    return nodes_repository.get_cluster_nodes_for_user(userId)